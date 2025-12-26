/**
 * IndoHomz - Static Property Data
 * Real properties with optimized images hosted on Vercel
 */

export interface Property {
  id: number
  title: string
  slug: string
  price: string
  location: string
  area: string
  city: string
  property_type: string
  bedrooms: number
  bathrooms: number
  area_sqft: number
  furnishing: string
  image_url: string
  images: string[]
  amenities: string
  highlights: string
  description: string
  latitude: number
  longitude: number
  is_available: boolean
  created_at: string
}

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Lotus Villas - DLF Phase 4",
    slug: "lotus-villas-dlf-phase-4",
    price: "₹26,000/month",
    location: "House No 1018, Lotus Villas - DLF Phase 4, Sector 28, Gurugram 120002",
    area: "Sector 28",
    city: "Gurgaon",
    property_type: "villa",
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1800,
    furnishing: "furnished",
    image_url: "/images/properties/dlf-phase-4/1.webp",
    images: [
      "/images/properties/dlf-phase-4/1.webp",
      "/images/properties/dlf-phase-4/2.webp",
      "/images/properties/dlf-phase-4/3.webp",
      "/images/properties/dlf-phase-4/4.webp",
      "/images/properties/dlf-phase-4/5.webp",
      "/images/properties/dlf-phase-4/6.webp",
      "/images/properties/dlf-phase-4/7.webp",
      "/images/properties/dlf-phase-4/8.webp",
      "/images/properties/dlf-phase-4/9.webp",
      "/images/properties/dlf-phase-4/10.webp",
      "/images/properties/dlf-phase-4/11.webp",
      "/images/properties/dlf-phase-4/12.webp",
      "/images/properties/dlf-phase-4/13.webp"
    ],
    amenities: "Gym, Swimming Pool, Club House, Park, 24x7 Security, Power Backup, High-Speed WiFi, Gated Community",
    highlights: "Near Hamilton Court Road, Near Chakkarpur, Prime DLF Phase 4 Location",
    description: "Premium villa in Lotus Villas DLF Phase 4 with world-class amenities. Spacious 3BHK villa in a gated community with excellent connectivity to Cyber City and Golf Course Road. Features include modern interiors, 24/7 security, and access to club house facilities.",
    latitude: 28.4675,
    longitude: 77.0839,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  },
  {
    id: 2,
    title: "Co-Living PG in Sushant Lok 2",
    slug: "co-living-pg-sushant-lok-2",
    price: "₹10,000/month",
    location: "H No. 1789, Block B1, Sushant Lok 2, Sector 57, Gurugram",
    area: "Sector 57",
    city: "Gurgaon",
    property_type: "pg",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 400,
    furnishing: "furnished",
    image_url: "/images/properties/sushant-lok-2/1.webp",
    images: [
      "/images/properties/sushant-lok-2/1.webp",
      "/images/properties/sushant-lok-2/2.webp",
      "/images/properties/sushant-lok-2/3S7A1308_09_10.webp",
      "/images/properties/sushant-lok-2/3S7A1324_5_6.webp",
      "/images/properties/sushant-lok-2/3S7A1332_3_4.webp",
      "/images/properties/sushant-lok-2/3S7A1336_7_8.webp",
      "/images/properties/sushant-lok-2/3S7A1408_09_10.webp",
      "/images/properties/sushant-lok-2/3S7A1412_3_4.webp",
      "/images/properties/sushant-lok-2/3S7A1424_5_6.webp",
      "/images/properties/sushant-lok-2/3S7A1432_3_4.webp",
      "/images/properties/sushant-lok-2/3S7A1452_3_4.webp"
    ],
    amenities: "Rooftop Dining Area, High-Speed WiFi, Fully Automatic Washing Machine, Daily Housekeeping, Dedicated Parking, CCTV Security, 24/7 Guard Facility, Healthy & Nutritious Food, 100% Power Backup, Brand New Property, Meals Included",
    highlights: "Near Golf Course Extension Road, 5 min from Rapid Metro, Meals Included",
    description: "Brand new co-living space with rooftop dining, daily housekeeping and nutritious meals included. Perfect for working professionals near Golf Course Extension Road. Brand new construction with modern amenities and excellent security.",
    latitude: 28.4401,
    longitude: 77.0819,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  },
  {
    id: 3,
    title: "Villa in Malibu Town",
    slug: "villa-malibu-town",
    price: "₹25,000/month",
    location: "H no. Charry 3, Malibu Town, Sector 47, Gurgaon",
    area: "Sector 47",
    city: "Gurgaon",
    property_type: "villa",
    bedrooms: 4,
    bathrooms: 3,
    area_sqft: 2500,
    furnishing: "furnished",
    image_url: "/images/properties/malibu-town/1.webp",
    images: [
      "/images/properties/malibu-town/1.webp",
      "/images/properties/malibu-town/2.webp",
      "/images/properties/malibu-town/3.webp",
      "/images/properties/malibu-town/4.webp",
      "/images/properties/malibu-town/DSC08740_1_2.webp",
      "/images/properties/malibu-town/DSC08749_50_51.webp",
      "/images/properties/malibu-town/DSC08803_4_5.webp",
      "/images/properties/malibu-town/DSC08812_3_4.webp",
      "/images/properties/malibu-town/DSC08839_40_41.webp",
      "/images/properties/malibu-town/DSC08848_49_50.webp",
      "/images/properties/malibu-town/DSC08872_3_4.webp",
      "/images/properties/malibu-town/DSC08899_900_901.webp"
    ],
    amenities: "Swimming Pool, Garden, Gym, Club House, 24x7 Security, Covered Parking, Power Backup",
    highlights: "Gated community, Near Sohna Road, Near Park Hospital, Near Good Earth City Centre",
    description: "Luxurious 4BHK villa in Malibu Town with premium amenities and beautiful garden. Gated community with 24/7 security. Spacious interiors with modern design. Close to Sohna Road with easy access to all major areas.",
    latitude: 28.4123,
    longitude: 77.0567,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  },
  {
    id: 4,
    title: "2BHK in Sector 40",
    slug: "2bhk-sector-40",
    price: "₹26,000/month",
    location: "House No 1085P, Sector 40, Gurgaon",
    area: "Sector 40",
    city: "Gurgaon",
    property_type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area_sqft: 1200,
    furnishing: "furnished",
    image_url: "/images/properties/sector-40/1.webp",
    images: [
      "/images/properties/sector-40/1.webp",
      "/images/properties/sector-40/2.webp",
      "/images/properties/sector-40/3.webp",
      "/images/properties/sector-40/4.webp",
      "/images/properties/sector-40/5.webp",
      "/images/properties/sector-40/6.webp",
      "/images/properties/sector-40/7.webp",
      "/images/properties/sector-40/8.webp",
      "/images/properties/sector-40/9.webp"
    ],
    amenities: "Parking, Power Backup, Security, Lift, Water Supply, Modular Kitchen, Meals Included",
    highlights: "Near Unitech Cyber Park, Near NH-8, Easy access to Delhi, Meals Included",
    description: "Modern 2BHK apartment with meals included. Well-connected location near Unitech Cyber Park. Fully furnished with modular kitchen and all modern amenities. Perfect for professionals working in Cyber Park or nearby areas.",
    latitude: 28.4598,
    longitude: 77.0489,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  }
]

// Get property by ID
export const getPropertyById = (id: number): Property | undefined => {
  return PROPERTIES.find(p => p.id === id)
}

// Get property by slug
export const getPropertyBySlug = (slug: string): Property | undefined => {
  return PROPERTIES.find(p => p.slug === slug)
}

// Get all available properties
export const getAvailableProperties = (): Property[] => {
  return PROPERTIES.filter(p => p.is_available)
}

// Get properties by type
export const getPropertiesByType = (type: string): Property[] => {
  return PROPERTIES.filter(p => p.property_type === type)
}

// Search properties
export const searchProperties = (query: string): Property[] => {
  const lowerQuery = query.toLowerCase()
  return PROPERTIES.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.location.toLowerCase().includes(lowerQuery) ||
    p.area.toLowerCase().includes(lowerQuery) ||
    p.amenities.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  )
}
