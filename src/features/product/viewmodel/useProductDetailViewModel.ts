// features/product/viewmodel/useProductDetailViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useCart } from '../../../services/CartContext';

export interface ProductDetail {
  id: string;
  name: string;
  farmer: string;
  farmerRating: number;
  price: number;
  unit: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
  inStock: boolean;
  stockAmount: string;
  images: string[];
}

// Mock product data (TODO: replace with API call)
const MOCK_PRODUCTS: Record<string, ProductDetail> = {
  p1: {
    id: 'p1',
    name: 'Organic Sukuma Wiki',
    farmer: 'Mama Mboga Farm',
    farmerRating: 4.8,
    price: 2500,
    unit: 'bunch',
    description: 'Freshly harvested organic sukuma wiki (collard greens) from our family farm in Wakiso. Grown without synthetic pesticides or fertilizers. Harvested this morning for maximum freshness.',
    category: 'vegetables',
    rating: 4.8,
    reviewCount: 42,
    isOrganic: true,
    inStock: true,
    stockAmount: '50+ bunches available',
    images: [],
  },
  p2: {
    id: 'p2',
    name: 'Fresh Matoke',
    farmer: 'Kampala Greens',
    farmerRating: 4.6,
    price: 5000,
    unit: 'kg',
    description: 'Green cooking bananas (matoke) from the fertile slopes of Mt. Elgon. Perfect for your traditional Ugandan meals.',
    category: 'vegetables',
    rating: 4.6,
    reviewCount: 28,
    isOrganic: false,
    inStock: true,
    stockAmount: '30 kg available',
    images: [],
  },
  p3: {
    id: 'p3',
    name: 'Ripe Avocados',
    farmer: 'Kayunga Organics',
    farmerRating: 4.9,
    price: 3000,
    unit: 'each',
    description: 'Large, creamy Hass avocados from Kayunga. Organically grown and tree-ripened for the perfect buttery texture.',
    category: 'fruits',
    rating: 4.9,
    reviewCount: 56,
    isOrganic: true,
    inStock: true,
    stockAmount: '20+ available',
    images: [],
  },
  // p4: {
  //   id: 'p4',
  //   name: 'Free-Range Eggs (tray)',
  //   farmer: 'Mukono Poultry',
  //   farmerRating: 4.7,
  //   price: 8000,
  //   unit: 'tray',
  //   description: 'Farm-fresh free-range eggs from happy chickens raised on open pastures in Mukono. Rich orange yolks, perfect for any recipe.',
  //   category: 'dairy_eggs',
  //   rating: 4.7,
  //   reviewCount: 35,
  //   isOrganic: true,
  //   inStock: true,
  //   stockAmount: '15 trays available',
  //   images: [],
  // },
  p5: {
    id: 'p5',
    name: 'sweet Bananas',
    farmer: 'Kayunga Organics',
    farmerRating: 4.7,
    price: 2000,
    unit: 'bunch',
    description: 'Farm-fresh free-range eggs from happy chickens raised on open pastures in Mukono. Rich orange yolks, perfect for any recipe.',
    category: 'fruits',
    rating: 4.5,
    reviewCount: 19,
    isOrganic: true,
    inStock: true,
    stockAmount: '10 bunch Available',
    images: [],
  },
};

export interface UseProductDetailViewModelReturn {
  product: ProductDetail | null;
  quantity: number;
  isLoading: boolean;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onAddToCart: () => void;
  onBack: () => void;
}

export function useProductDetailViewModel(): UseProductDetailViewModelReturn {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isLoading] = useState(false);

  const product = useMemo(() => {
    if (!id) return null;
    return MOCK_PRODUCTS[id] ?? null;
  }, [id]);

  const onIncreaseQuantity = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, 20));
  }, []);

  const onDecreaseQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }, []);

  const { addItem } = useCart();

  const onAddToCart = useCallback(() => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      quantity,
      farmer: product.farmer,
      category: product.category,
    });
    router.back();
  }, [product, quantity, addItem]);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  return {
    product,
    quantity,
    isLoading,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onAddToCart,
    onBack,
  };
}