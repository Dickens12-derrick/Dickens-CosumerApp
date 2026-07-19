// services/types.ts
// Shared type definitions used across multiple features

export interface Product {
  id: string;
  name: string;
  farmer: string;
  price: number;
  unit: string;
  imageUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  farmer: string;
  category: string;
}

export interface Address {
  id: string;
  label: string;
  landmark: string;
  coordinates: string;
  isDefault: boolean;
}