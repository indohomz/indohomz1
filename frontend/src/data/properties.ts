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
    title: "Sky Living - DLF Phase IV",
    slug: "sky-living-dlf-phase-4",
    price: "₹25,000/month",
    location: "Plot No 1018, Lotus Villas, DLF Phase IV, Sector 27, Gurugram, Haryana",
    area: "DLF Phase 4",
    city: "Gurgaon",
    property_type: "pg",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 450,
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
    amenities: "High-Speed WiFi, Fully Automatic Washing Machine, Daily Housekeeping, Dedicated Parking, CCTV Security, 24/7 Security Guard, 100% Power Backup, Doctor on Call, Floor-wise Water Purifier, Common TV, Common Hangout Area, Attached Washroom, Attached Balcony, First Aid Box",
    highlights: "Prime DLF Phase 4 Location, Near Golf Course Road, Near Cyber City, Students & Working Professionals, Single Sharing, Boys/Girls",
    description: "Experience premium co-living at Sky Living in DLF Phase IV. Brand new property with modern amenities including attached washroom and balcony. Perfect location near Cyber City and Golf Course Road. Includes daily housekeeping, high-speed WiFi, and 24/7 security. Ideal for students and working professionals seeking a hassle-free living experience.",
    latitude: 28.4675,
    longitude: 77.0839,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  },
  {
    id: 2,
    title: "IndoHomz 571 - Sushant Lok 3",
    slug: "indohomz-571-sushant-lok-3",
    price: "₹19,999/month",
    location: "House No. 3545k, Sushant Lok 3, Gurgaon, Haryana",
    area: "Sushant Lok 3",
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
    amenities: "Common Laundry, Common Floor WiFi, Common Washroom, Weekly Pest Control, CCTV, 24/7 Security Guard, Common Parking, Doctor on Call, Floor-wise Water Purifier, Common TV, Common Hangout Area, Common Fridge, Common Washing Machine, Common Terrace, Common Balcony, Kitchen, High-Speed WiFi, First Aid Box",
    highlights: "Students/Working Professionals, Single Sharing, Boys/Girls Welcome, Near Golf Course Extension Road, Brand New Property",
    description: "Modern co-living space in Sushant Lok 3 with comprehensive amenities. Features include common laundry, WiFi, pest control, and 24/7 security. Perfect for students and working professionals. Located near Golf Course Extension Road with easy access to major business districts. Affordable pricing with excellent facilities and community living environment.",
    latitude: 28.4401,
    longitude: 77.0819,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  },
  {
    id: 3,
    title: "IndoHomz - Sector 40",
    slug: "indohomz-sector-40",
    price: "₹14,000/month",
    location: "H No. 1085P, Sector 40, Gurgaon, Haryana",
    area: "Sector 40",
    city: "Gurgaon",
    property_type: "pg",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 350,
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
    amenities: "High-Speed WiFi, CCTV Security, 24/7 Security Guard, Power Backup, Common Kitchen, Common Washroom, Common TV, Common Fridge, Weekly Pest Control, Doctor on Call, First Aid Box, Common Parking, Water Purifier",
    highlights: "Single, Double, Triple Sharing Available, Students & Working Professionals, Boys/Girls, Near Unitech Cyber Park, Near NH-8, Budget Friendly",
    description: "Affordable co-living space in Sector 40 with flexible sharing options. Located near Unitech Cyber Park with excellent connectivity to NH-8 and Delhi. Features include high-speed WiFi, security, and all basic amenities. Perfect for students and working professionals looking for budget-friendly accommodation in a prime location.",
    latitude: 28.4598,
    longitude: 77.0489,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  },
  {
    id: 4,
    title: "IndoHomz 241",
    slug: "indohomz-241",
    price: "₹8,000/month",
    location: "Gurgaon, Haryana",
    area: "Gurgaon",
    city: "Gurgaon",
    property_type: "pg",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 300,
    furnishing: "furnished",
    image_url: "/images/properties/malibu-town/1.webp",
    images: [
      "/images/properties/malibu-town/1.webp",
      "/images/properties/malibu-town/2.webp",
      "/images/properties/malibu-town/3.webp",
      "/images/properties/malibu-town/4.webp",
      "/images/properties/malibu-town/DSC08740_1_2.webp",
      "/images/properties/malibu-town/DSC08749_50_51.webp"
    ],
    amenities: "WiFi, Security, Power Backup, Common Kitchen, Common Washroom, Water Supply, Weekly Pest Control, Parking, First Aid Box",
    highlights: "Single, Double, Triple Sharing, Students/Working Professionals, Boys/Girls, Most Affordable, Great for Students",
    description: "Budget-friendly accommodation perfect for students and entry-level professionals. Basic amenities with WiFi, security, and common facilities. Multiple sharing options available to suit different budgets. Ideal for those looking for affordable housing in Gurgaon with a friendly community atmosphere.",
    latitude: 28.4500,
    longitude: 77.0500,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  },
  {
    id: 5,
    title: "The Sky Living - Sushant Lok 1",
    slug: "the-sky-living-sushant-lok-1",
    price: "₹25,000/month",
    location: "House No. 1B, Block C2, Sushant Lok 1, Gurgaon, Haryana",
    area: "Sushant Lok 1",
    city: "Gurgaon",
    property_type: "pg",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 450,
    furnishing: "furnished",
    image_url: "/images/properties/dlf-phase-4/2.webp",
    images: [
      "/images/properties/dlf-phase-4/2.webp",
      "/images/properties/dlf-phase-4/3.webp",
      "/images/properties/dlf-phase-4/4.webp",
      "/images/properties/dlf-phase-4/5.webp",
      "/images/properties/dlf-phase-4/6.webp",
      "/images/properties/dlf-phase-4/7.webp",
      "/images/properties/dlf-phase-4/8.webp"
    ],
    amenities: "High-Speed WiFi, Daily Housekeeping, CCTV Security, 24/7 Security Guard, Power Backup, Common Kitchen, Attached Washroom, Common TV, Common Hangout Area, Doctor on Call, Water Purifier, Weekly Pest Control, Parking, First Aid Box",
    highlights: "Single, Double, Triple Sharing, Students/Working Professionals, Boys/Girls, Premium Location, Near Metro Station, Near Market",
    description: "Premium co-living space in the heart of Sushant Lok 1. Features modern amenities including daily housekeeping and high-speed WiFi. Multiple sharing options available. Excellent location with easy access to metro, markets, and major corporate offices. Perfect for professionals seeking a comfortable and convenient living experience.",
    latitude: 28.4690,
    longitude: 77.0730,
    is_available: true,
    created_at: "2024-12-26T00:00:00Z"
  },
  {
    id: 6,
    title: "IndoHomz 574",
    slug: "indohomz-574",
    price: "₹25,000/month",
    location: "Gurgaon, Haryana",
    area: "Gurgaon",
    city: "Gurgaon",
    property_type: "pg",
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: 400,
    furnishing: "furnished",
    image_url: "/images/properties/sector-40/2.webp",
    images: [
      "/images/properties/sector-40/2.webp",
      "/images/properties/sector-40/3.webp",
      "/images/properties/sector-40/4.webp",
      "/images/properties/sector-40/5.webp",
      "/images/properties/sector-40/6.webp",
      "/images/properties/sector-40/7.webp"
    ],
    amenities: "High-Speed WiFi, CCTV Security, 24/7 Security Guard, Power Backup, Common Kitchen, Common Washroom, Attached Balcony, Common TV, Common Fridge, Weekly Pest Control, Doctor on Call, Water Purifier, Parking, First Aid Box",
    highlights: "Single, Double Sharing, Students & Working Professionals, Boys/Girls, Modern Amenities, Peaceful Environment",
    description: "Comfortable co-living space with modern amenities and peaceful environment. Features include high-speed WiFi, security, and well-maintained common areas. Suitable for both single and double sharing. Perfect for professionals and students looking for a quiet yet well-connected accommodation in Gurgaon.",
    latitude: 28.4550,
    longitude: 77.0600,
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
