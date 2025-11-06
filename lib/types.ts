export interface Course {
  id: string;
  title: string;
  level?: string;
  imageUrl?: string;
  courseDuration: string;
  description: string;
  price: number;
  graduates?: number;
  rating: number;
  tags?: string[];
  reviews?: number;
  features?: Array<{ icon: string; text: string }>;
}
