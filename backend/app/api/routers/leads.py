"""
IndoHomz Leads Router

Handles all lead/inquiry endpoints with rate limiting and spam protection.
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.connection import get_db
from app.schemas.schemas import Lead, LeadCreate, LeadUpdate
from app.services.crud import lead_service
from app.core.rate_limit import rate_limit_lead_submission, rate_limit_moderate
from app.core.security import require_recaptcha, validate_phone_number, normalize_phone_number, sanitize_html, get_current_user

router = APIRouter()


# =============================================================================
# LIST & FILTER
# =============================================================================

@router.get("/", response_model=List[Lead])
async def get_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    status: Optional[str] = Query(None, description="Filter by status (new, contacted, site_visit, etc.)"),
    source: Optional[str] = Query(None, description="Filter by source (website, whatsapp, referral)"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Get all leads with optional filters.
    
    Requires authentication.
    """
    return lead_service.get_leads(
        db=db,
        skip=skip,
        limit=limit,
        status=status,
        source=source,
    )


@router.get("/property/{property_id}", response_model=List[Lead])
async def get_leads_by_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Get all leads/inquiries for a specific property.
    
    Requires authentication.
    """
    return lead_service.get_leads_by_property(db=db, property_id=property_id)


# =============================================================================
# SINGLE LEAD
# =============================================================================

@router.get("/{lead_id}", response_model=Lead)
async def get_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Get a single lead by ID.
    
    Requires authentication.
    """
    lead = lead_service.get_lead(db=db, lead_id=lead_id)
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    return lead


# =============================================================================
# CREATE & UPDATE
# =============================================================================

@router.post("/", response_model=Lead, status_code=status.HTTP_201_CREATED)
async def create_lead(
    lead_data: LeadCreate,
    request: Request,
    db: Session = Depends(get_db),
    _rate_limit: None = Depends(rate_limit_lead_submission),
):
    """
    Create a new lead/inquiry with rate limiting and spam protection.
    
    Rate limit: 5 submissions per hour per IP address.
    """
    # Validate phone number
    if lead_data.phone and not validate_phone_number(lead_data.phone):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid phone number format. Please enter a valid Indian phone number."
        )
    
    # Normalize phone number
    if lead_data.phone:
        lead_data.phone = normalize_phone_number(lead_data.phone)
    
    # Sanitize text inputs to prevent XSS
    if lead_data.name:
        lead_data.name = sanitize_html(lead_data.name)
    if lead_data.message:
        lead_data.message = sanitize_html(lead_data.message)
    
    return lead_service.create_lead(db=db, lead_data=lead_data)


@router.post("/inquiry")
async def submit_inquiry(
    request: Request,
    name: str,
    phone: str,
    property_id: Optional[int] = None,
    email: Optional[str] = None,
    message: Optional[str] = None,
    source: str = "website",
    recaptcha_token: Optional[str] = None,
    db: Session = Depends(get_db),
    _rate_limit: None = Depends(rate_limit_lead_submission),
):
    """
    Submit a quick inquiry (alternative endpoint with reCAPTCHA support).
    
    Rate limit: 5 submissions per hour per IP address.
    """
    # Verify reCAPTCHA if enabled
    if recaptcha_token:
        from app.core.security import verify_recaptcha
        client_ip = request.client.host if request.client else None
        is_valid = await verify_recaptcha(recaptcha_token, client_ip)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="reCAPTCHA verification failed"
            )
    
    # Validate phone number
    if not validate_phone_number(phone):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid phone number format"
        )
    
    # Create lead
    lead_data = LeadCreate(
        name=sanitize_html(name),
        phone=normalize_phone_number(phone),
        email=email,
        message=sanitize_html(message) if message else None,
        property_id=property_id,
        source=source
    )
    
    lead = lead_service.create_lead(db=db, lead_data=lead_data)
    
    return {
        "success": True,
        "message": "Thank you! We'll contact you shortly.",
        "lead_id": lead.id
    }


@router.put("/{lead_id}", response_model=Lead)
async def update_lead(
    lead_id: int,
    lead_update: LeadUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Update a lead.
    
    Requires authentication.
    """
    lead = lead_service.update_lead(
        db=db,
        lead_id=lead_id,
        lead_update=lead_update
    )
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    return lead


@router.patch("/{lead_id}/status")
async def update_lead_status(
    lead_id: int,
    new_status: str = Query(..., description="new, contacted, site_visit, negotiation, converted, lost"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Quick update for lead status.
    
    Requires authentication.
    Use this for CRM workflow - moving leads through the funnel.
    """
    valid_statuses = ["new", "contacted", "site_visit", "negotiation", "converted", "lost"]
    if new_status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {valid_statuses}"
        )
    
    lead = lead_service.update_lead_status(db=db, lead_id=lead_id, status=new_status)
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    
    return {"message": f"Lead status updated to {new_status}", "lead_id": lead_id}


# =============================================================================
# STATISTICS
# =============================================================================

@router.get("/stats/overview")
async def get_lead_stats(db: Session = Depends(get_db)):
    """
    Get lead statistics for dashboard.
    
    Returns total leads, conversion rates, funnel data, and source breakdown.
    """
    return lead_service.get_lead_stats(db=db)


@router.get("/stats/funnel")
async def get_lead_funnel(db: Session = Depends(get_db)):
    """
    Get lead funnel visualization data.
    """
    stats = lead_service.get_lead_stats(db=db)
    
    # Build funnel stages
    funnel = []
    status_order = ["new", "contacted", "site_visit", "negotiation", "converted"]
    
    for status_name in status_order:
        count = next((s["count"] for s in stats["by_status"] if s["status"] == status_name), 0)
        funnel.append({
            "stage": status_name.replace("_", " ").title(),
            "count": count,
        })
    
    return {
        "funnel": funnel,
        "conversion_rate": stats["conversion_rate"],
        "total_leads": stats["total_leads"],
    }





