import { User } from './user';

export class Property {
  id: number;
  description: string;
  imageUrl: string;
  streetAddress: string;
  suburb: string;
  city: string;
  province: string;
  price: number;
  createdAt: string;
  category: string;
  status: string;
  user: User;
}
