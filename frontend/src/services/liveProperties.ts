import { propertyService, type Property as ApiProperty } from './api'
import { PROPERTIES, type Property as StaticProperty, type AvailabilityStatus } from '../data/properties'

export interface LiveProperty {
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
  availability_status: AvailabilityStatus
  availability_text: string
  created_at: string
}

export const normalizeImageUrl = (url: string | undefined, _seed: number): string => {
  // Keep original property photos as-is (no auto replacement).
  return url || ''
}

const toStringList = (images: string | string[] | undefined): string[] => {
  if (Array.isArray(images)) return images
  if (!images) return []

  try {
    const parsed = JSON.parse(images) as unknown
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string')
    }
  } catch {
    // If it isn't valid JSON, fall back to text splitting below.
  }

  return images
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

const deriveAvailability = (isAvailable: boolean): { status: AvailabilityStatus; text: string } => {
  if (!isAvailable) return { status: 'fully-booked', text: 'Fully Booked' }
  return { status: 'available-now', text: 'Available Now' }
}

export const toLiveProperty = (
  property: ApiProperty | StaticProperty,
  index: number
): LiveProperty => {
  const parsedImages = toStringList(property.images as string | string[] | undefined)
  const normalizedMain = normalizeImageUrl(property.image_url, property.id || index)
  const normalizedImages = (parsedImages.length > 0 ? parsedImages : [normalizedMain]).map((img, imgIndex) =>
    normalizeImageUrl(img, (property.id || index) + imgIndex)
  )
  const availability = deriveAvailability(Boolean(property.is_available))

  return {
    id: property.id,
    title: property.title,
    slug: property.slug || `property-${property.id}`,
    price: property.price,
    location: property.location,
    area: property.area || property.city || 'Gurgaon',
    city: property.city || 'Gurgaon',
    property_type: property.property_type || 'pg',
    bedrooms: property.bedrooms ?? 1,
    bathrooms: property.bathrooms ?? 1,
    area_sqft: property.area_sqft ?? 0,
    furnishing: property.furnishing || 'furnished',
    image_url: normalizedMain,
    images: normalizedImages,
    amenities: property.amenities || '',
    highlights: property.highlights || '',
    description: property.description || 'Comfortable living space in Gurgaon.',
    latitude: (property as StaticProperty).latitude ?? 28.4595,
    longitude: (property as StaticProperty).longitude ?? 77.0266,
    is_available: Boolean(property.is_available),
    availability_status: (property as StaticProperty).availability_status || availability.status,
    availability_text: (property as StaticProperty).availability_text || availability.text,
    created_at: property.created_at || new Date().toISOString(),
  }
}

export const fetchLiveProperties = async (): Promise<LiveProperty[]> => {
  try {
    const response = await propertyService.getProperties({ limit: 100 })
    const items = Array.isArray(response.data?.items) ? response.data.items : []
    if (items.length === 0) {
      return PROPERTIES.map((property, index) => toLiveProperty(property, index))
    }
    return items.map((property, index) => toLiveProperty(property, index))
  } catch {
    return PROPERTIES.map((property, index) => toLiveProperty(property, index))
  }
}

export const findLivePropertyBySlug = async (slug: string): Promise<LiveProperty | undefined> => {
  const properties = await fetchLiveProperties()
  return properties.find((property) => property.slug === slug || String(property.id) === slug)
}
