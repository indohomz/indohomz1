from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.connection import Base


# =============================================================================
# USER MODEL (Authentication)
# =============================================================================

class User(Base):
    """
    IndoHomz User Model
    Represents admin users who can manage properties and leads
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    
    # Authentication
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    
    # Profile
    name = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    
    # Role-based access
    role = Column(String(50), default="staff")  # admin, staff, viewer
    
    # Status
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)


# =============================================================================
# PROPERTY MODEL
# =============================================================================

class Property(Base):
    """
    IndoHomz Property Model
    Represents a luxury rental property listing
    """
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), nullable=True, unique=True, index=True)  # URL-friendly identifier
    
    # Pricing
    price = Column(String(100), nullable=False)  # Display format: "₹15,000/month"
    price_numeric = Column(Float, nullable=True, index=True)  # Numeric value for sorting/filtering
    
    # Location
    location = Column(String(255), nullable=False, default="Gurgaon")
    area = Column(String(100), nullable=True)  # e.g., "Sector 45", "Cyberhub"
    city = Column(String(100), nullable=False, default="Gurgaon")
    
    # Property Details
    property_type = Column(String(50), default="apartment")  # apartment, villa, studio, penthouse, pg
    bedrooms = Column(Integer, nullable=True)  # 1, 2, 3, etc. (null for studio/PG)
    bathrooms = Column(Integer, nullable=True)
    area_sqft = Column(Integer, nullable=True)  # Square footage
    furnishing = Column(String(50), default="furnished")  # furnished, semi-furnished, unfurnished
    
    # Media
    image_url = Column(String(1024), nullable=True)
    images = Column(Text, nullable=True)  # JSON array of additional image URLs
    
    # Features
    amenities = Column(Text, nullable=False, default="Wifi, AC, Power Backup")  # Comma-separated or JSON
    highlights = Column(Text, nullable=True)  # Key selling points
    
    # AI-Generated Content
    description = Column(Text, nullable=True)  # AI-generated property description
    
    # Availability
    is_available = Column(Boolean, default=True)
    available_from = Column(DateTime(timezone=True), nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Composite indexes for common queries
    __table_args__ = (
        Index('idx_property_city_available', 'city', 'is_available'),
        Index('idx_property_type_available', 'property_type', 'is_available'),
        Index('idx_property_price_available', 'price_numeric', 'is_available'),
    )


# =============================================================================
# LEAD MODEL
# =============================================================================


class Lead(Base):
    """
    IndoHomz Lead/Inquiry Model
    Represents a potential customer inquiry
    """
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Contact Info
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=True, index=True)
    phone = Column(String(20), nullable=False, index=True)
    
    # Inquiry Details
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=True, index=True)
    message = Column(Text, nullable=True)
    preferred_visit_date = Column(DateTime(timezone=True), nullable=True)
    
    # Lead Status
    status = Column(String(50), default="new")  # new, contacted, site_visit, negotiation, converted, lost
    source = Column(String(50), default="website")  # website, whatsapp, referral, instagram
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    property = relationship("Property", backref="leads")
    
    # Composite indexes for common queries
    __table_args__ = (
        Index('idx_lead_status_created', 'status', 'created_at'),
        Index('idx_lead_property_status', 'property_id', 'status'),
    )


# =============================================================================
# BOOKING MODEL
# =============================================================================

class Booking(Base):
    """
    IndoHomz Booking Model
    Represents a confirmed property booking/rental
    """
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # References
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=True, index=True)
    
    # Tenant Info
    tenant_name = Column(String(100), nullable=False)
    tenant_email = Column(String(255), nullable=True)
    tenant_phone = Column(String(20), nullable=False)
    
    # Booking Details
    check_in = Column(DateTime(timezone=True), nullable=False)
    check_out = Column(DateTime(timezone=True), nullable=True)  # Null for long-term rentals
    monthly_rent = Column(Float, nullable=False)
    security_deposit = Column(Float, nullable=True)
    
    # Status
    status = Column(String(50), default="confirmed")  # confirmed, active, completed, cancelled
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    property = relationship("Property", backref="bookings")
    lead = relationship("Lead", backref="bookings")
