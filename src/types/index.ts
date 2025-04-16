
export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: UserRole;
}

export interface Buyer extends User {
  role: 'buyer';
  shopName: string;
  location: string;
  openingTime: string;
  closingTime: string;
  holidays: string[];
}

export interface Seller extends User {
  role: 'seller';
  address: string;
  crops: string[];
  harvestSeason: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  sellerId: string;
}

export interface SellingRequest {
  id: string;
  product: Product;
  sellerId: string;
  buyerId: string;
  status: 'pending' | 'accepted' | 'rejected';
  transportationCost: number;
  createdAt: string;
}
