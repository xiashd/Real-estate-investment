export interface Project {
  id: string;
  name: string;
  location: string;
  totalArea: string;
  rentRange: string;
  images: string[];
  tags: string[];
  listingCount: number;
  isFavorite: boolean;
  // Detail info
  subProject?: string;
  managedArea?: string;
  buildingArea?: string;
  vacantArea?: string;
  rentableArea?: string;
  propertyPrice?: string;
  avgRent?: string;
  description?: string;
  coordinates: {lat: number; lng: number};
}

export interface Listing {
  id: string;
  projectId: string;
  name: string;
  location: string;
  area: string;
  rent: string;
  images: string[];
  tags: string[];
  isFavorite: boolean;
  // Detail info
  floorRoom?: string;
  type?: string;
  nature?: string;
  decoration?: string;
  propertyFee?: string;
  description?: string;
  agent?: {
    name: string;
    phone: string;
  };
}

export interface Recommendation {
  listingId: string;
  listingName: string;
  projectName: string;
  leaseType: string;
  customerName: string;
  customerPhone: string;
  intendedArea: string;
  intendedRent: string;
}
