// features/home/data/mockHomeData.ts
import { Product, Category, Banner } from '../viewmodel/useHomeViewModel';

export const FEATURED_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Organic Sukuma Wiki', farmer: 'Mama Mboga Farm', price: 2500, unit: 'bunch', imageUrl: 'sukuma.jpg', category: 'vegetables', rating: 4.8, reviewCount: 42, isOrganic: true },
  { id: 'p2', name: 'Fresh Matoke', farmer: 'Kampala Greens', price: 5000, unit: 'kg', imageUrl: 'matooke.jpg', category: 'vegetables', rating: 4.6, reviewCount: 28, isOrganic: false },
  { id: 'p3', name: 'Ripe Avocados', farmer: 'Kayunga Organics', price: 3000, unit: 'each', imageUrl: 'avocado ready.jpg', category: 'fruits', rating: 4.9, reviewCount: 56, isOrganic: true },
  { id: 'p4', name: 'Free-Range Eggs (tray)', farmer: 'Mukono Poultry', price: 8000, unit: 'tray', imageUrl: 'eggs2.jpg', category: 'dairy_eggs', rating: 4.7, reviewCount: 35, isOrganic: true },
  ]
  

export const CATEGORIES: Category[] = [
  { id: 'vegetables', name: 'Vegetables', icon: 'vegetables' },
  { id: 'fruits', name: 'Fruits', icon: 'fruits' },
  { id: 'dairy_eggs', name: 'Dairy & Eggs', icon: 'dairy_eggs' },
  { id: 'grains', name: 'Grains & Cereals', icon: 'grains' },
  { id: 'fish_meat', name: 'Fish & Meat', icon: 'fish_meat' },
  { id: 'herbs', name: 'Herbs & Spices', icon: 'herbs' },
  // { id: 'milk', name: 'Cow products', icon: 'milk'},
];

export const BANNERS: Banner[] = [
  { id: 'b1', title: 'Fresh from the farm', subtitle: 'Get 10% off your first order', imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800', backgroundColor: '#1B5E20' },
  { id: 'b2', title: 'Support local farmers', subtitle: 'Direct from grower to you', imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800', backgroundColor: '#2E7D32' },
];