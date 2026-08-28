export interface GearReview {
  id?: string;
  rating?: number;
  comment?: string;
  user?: {
    name?: string;
  };
}

export interface Gear {
  id: string;
  name: string;
  category: string;
  price: number;
  reviews: GearReview[];
  image: string;
  description: string;
  badge?: string | null;
}
