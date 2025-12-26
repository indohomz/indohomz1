/**
 * SEO Component for IndoHomz
 * 
 * Provides dynamic meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
 * Uses react-helmet-async for SSR-compatible head management.
 */

import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  children?: React.ReactNode
  // Property-specific
  property?: {
    id: number
    title: string
    description?: string
    price: string
    location: string
    city: string
    image?: string
    bedrooms?: number
    bathrooms?: number
    area_sqft?: number
    property_type?: string
    amenities?: string[]
    is_available?: boolean
  }
}

const SITE_NAME = 'IndoHomz'
const BASE_URL = 'https://indohomz.com'
const DEFAULT_IMAGE = `${BASE_URL}/images/og-default.jpg`
const DEFAULT_DESCRIPTION = 'Find your perfect home with IndoHomz. Premium co-living spaces, fully-furnished apartments, and verified PGs in Gurgaon. Zero brokerage, instant booking.'

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = ['PG in Gurgaon', 'co-living', 'rental apartments', 'furnished rooms', 'student housing'],
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noindex = false,
  property,
  children
}: SEOProps) {
  // Build full title
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Premium Co-Living in Gurgaon`
  
  // Build canonical URL
  const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL
  
  // Property-specific overrides
  if (property) {
    const propertyTitle = `${property.title} in ${property.location} | ${SITE_NAME}`
    const propertyDescription = property.description || 
      `${property.bedrooms || 1} BHK ${property.property_type || 'property'} for rent at ${property.price}/month in ${property.location}, ${property.city}. ${property.amenities?.slice(0, 3).join(', ') || 'Modern amenities included'}.`
    
    return (
      <Helmet>
        {/* Basic Meta */}
        <title>{propertyTitle}</title>
        <meta name="description" content={propertyDescription.substring(0, 160)} />
        <meta name="keywords" content={`${property.location}, ${property.city}, ${property.property_type}, rent, ${keywords.join(', ')}`} />
        <link rel="canonical" href={`${BASE_URL}/property/${property.id}`} />
        
        {/* Robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}
        
        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={propertyTitle} />
        <meta property="og:description" content={propertyDescription.substring(0, 200)} />
        <meta property="og:image" content={property.image || DEFAULT_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/property/${property.id}`} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_IN" />
        
        {/* Product-specific OG */}
        <meta property="product:price:amount" content={property.price.replace(/[^\d]/g, '')} />
        <meta property="product:price:currency" content="INR" />
        <meta property="product:availability" content={property.is_available ? 'in stock' : 'out of stock'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={propertyTitle} />
        <meta name="twitter:description" content={propertyDescription.substring(0, 200)} />
        <meta name="twitter:image" content={property.image || DEFAULT_IMAGE} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generatePropertySchema(property))}
        </script>
        
        {children}
      </Helmet>
    )
  }
  
  // Default page SEO
  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description.substring(0, 160)} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description.substring(0, 200)} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description.substring(0, 200)} />
      <meta name="twitter:image" content={image} />
      
      {/* JSON-LD Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {children}
    </Helmet>
  )
}

// =============================================================================
// JSON-LD STRUCTURED DATA SCHEMAS
// =============================================================================

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "IndoHomz",
  "description": "Premium co-living and rental property platform in Gurgaon",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "image": DEFAULT_IMAGE,
  "telephone": "+91-XXXXXXXXXX",
  "email": "info@indohomz.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gurgaon",
    "addressRegion": "Haryana",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.4595",
    "longitude": "77.0266"
  },
  "areaServed": {
    "@type": "City",
    "name": "Gurgaon"
  },
  "priceRange": "₹₹-₹₹₹",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "21:00"
  },
  "sameAs": [
    "https://www.instagram.com/indohomz",
    "https://www.facebook.com/indohomz",
    "https://www.linkedin.com/company/indohomz"
  ]
}

function generatePropertySchema(property: NonNullable<SEOProps['property']>) {
  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": property.title,
    "description": property.description || `${property.bedrooms || 1} BHK property for rent in ${property.location}`,
    "url": `${BASE_URL}/property/${property.id}`,
    "image": property.image || DEFAULT_IMAGE,
    "numberOfRooms": property.bedrooms || 1,
    "numberOfBathroomsTotal": property.bathrooms || 1,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.area_sqft || 500,
      "unitCode": "FTK" // Square feet
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.location,
      "addressLocality": property.city || "Gurgaon",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "amenityFeature": (property.amenities || []).map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "offers": {
      "@type": "Offer",
      "price": property.price.replace(/[^\d]/g, ''),
      "priceCurrency": "INR",
      "availability": property.is_available 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "seller": {
        "@type": "RealEstateAgent",
        "name": "IndoHomz",
        "url": BASE_URL
      }
    },
    "potentialAction": {
      "@type": "RentAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/property/${property.id}#contact`
      }
    }
  }
}

// =============================================================================
// BREADCRUMB COMPONENT
// =============================================================================

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  }
  
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// =============================================================================
// FAQ SCHEMA (for landing page)
// =============================================================================

interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
  
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}
