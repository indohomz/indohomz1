"""
IndoHomz Maps Router

Proxy for Google Maps API to keep API key secure on backend.
"""

from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import RedirectResponse, HTMLResponse
from app.core.config import settings

router = APIRouter()


@router.get("/embed")
async def get_maps_embed(location: str = Query(..., description="Location to show on map")):
    """
    Redirect to Google Maps embed with API key.
    This keeps the API key secure on the backend.
    """
    if not settings.GOOGLE_MAPS_API_KEY:
        return HTMLResponse(
            content="""
            <div style="display: flex; align-items: center; justify-content: center; 
                        height: 100%; background: #f3f4f6; color: #6b7280; 
                        font-family: system-ui; padding: 2rem; text-align: center;">
                <div>
                    <svg style="width: 48px; height: 48px; margin: 0 auto 1rem;" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <p style="font-size: 14px; margin: 0;">Map not available</p>
                    <p style="font-size: 12px; margin: 0.5rem 0 0; opacity: 0.7;">
                        Google Maps API key not configured
                    </p>
                </div>
            </div>
            """,
            status_code=200
        )
    
    # Redirect to Google Maps embed
    embed_url = f"https://www.google.com/maps/embed/v1/place?key={settings.GOOGLE_MAPS_API_KEY}&q={location}&zoom=15"
    return RedirectResponse(url=embed_url)


@router.get("/directions")
async def get_directions_link(location: str = Query(..., description="Destination location")):
    """
    Get Google Maps directions link (doesn't require API key).
    """
    return {
        "url": f"https://www.google.com/maps/dir/?api=1&destination={location}",
        "location": location
    }


@router.get("/config")
async def get_maps_config():
    """
    Get maps configuration for frontend (without exposing API key).
    Returns whether maps are enabled and other public config.
    """
    return {
        "enabled": bool(settings.GOOGLE_MAPS_API_KEY),
        "provider": "google_maps",
        "features": {
            "embed": bool(settings.GOOGLE_MAPS_API_KEY),
            "directions": True,  # Directions don't require API key
            "search": bool(settings.GOOGLE_MAPS_API_KEY),
        }
    }
