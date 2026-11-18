export interface Property {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  pricePerNight: number;
  currency: 'USD' | 'BOB';
  category: 'Luxe' | 'Cabaña' | 'Playa' | 'Montaña' | 'Ciudad';
  location: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  isVerifiedLuxe?: boolean;
  specs: {
    areaSqm: number;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    garages: number;
  };
  host: {
    name: string;
    isSuperhost: boolean;
    yearsExperience: number;
  };
  images: string[];
  amenities: string[];
}