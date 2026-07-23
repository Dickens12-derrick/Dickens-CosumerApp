// features/discover/viewmodel/useDiscoverViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { navigateTo } from '../../../services/navigation';

export interface Product {
  id: string;
  name: string;
  farmer: string;
  price: number;
  unit: string;
  category: string;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

const ALL_PRODUCTS: Product[] = [
  // Vegetables (7 products)
  { id: 'p1', name: 'Organic Sukuma Wiki', farmer: 'Mama Mboga Farm', price: 2500, unit: 'bunch', category: 'vegetables', rating: 4.8, reviewCount: 42, isOrganic: true },
  { id: 'p2', name: 'Fresh Matoke', farmer: 'Kampala Greens', price: 5000, unit: 'kg', category: 'vegetables', rating: 4.6, reviewCount: 28, isOrganic: false },
  { id: 'p11', name: 'Organic Tomatoes', farmer: 'Kayunga Organics', price: 4000, unit: 'kg', category: 'vegetables', rating: 4.7, reviewCount: 38, isOrganic: true },
  { id: 'p13', name: 'Fresh Cabbage', farmer: 'Mama Mboga Farm', price: 3000, unit: 'each', category: 'vegetables', rating: 4.5, reviewCount: 31, isOrganic: false },
  { id: 'p14', name: 'Broccoli', farmer: 'Kampala Greens', price: 5000, unit: 'kg', category: 'vegetables', rating: 4.3, reviewCount: 18, isOrganic: true },
  { id: 'p15', name: 'Sweet Corn', farmer: 'Gulu Grains', price: 2000, unit: 'each', category: 'vegetables', rating: 4.6, reviewCount: 25, isOrganic: false },
  { id: 'p16', name: 'Green Beans', farmer: 'Kayunga Organics', price: 3500, unit: 'kg', category: 'vegetables', rating: 4.4, reviewCount: 21, isOrganic: true },

  // Fruits (7 products)
  { id: 'p3', name: 'Ripe Avocados', farmer: 'Kayunga Organics', price: 3000, unit: 'each', category: 'fruits', rating: 4.9, reviewCount: 56, isOrganic: true },
  { id: 'p5', name: 'Sweet Bananas', farmer: 'Kayunga Organics', price: 2000, unit: 'bunch', category: 'fruits', rating: 4.5, reviewCount: 19, isOrganic: false },
  { id: 'p17', name: 'Fresh Mangoes', farmer: 'Mama Mboga Farm', price: 3500, unit: 'kg', category: 'fruits', rating: 4.7, reviewCount: 33, isOrganic: false },
  { id: 'p18', name: 'Pineapple', farmer: 'Kayunga Organics', price: 5000, unit: 'each', category: 'fruits', rating: 4.8, reviewCount: 41, isOrganic: true },
  { id: 'p19', name: 'Watermelon', farmer: 'Kampala Greens', price: 8000, unit: 'each', category: 'fruits', rating: 4.5, reviewCount: 27, isOrganic: false },
  { id: 'p20', name: 'Oranges', farmer: 'Mama Mboga Farm', price: 3000, unit: 'kg', category: 'fruits', rating: 4.4, reviewCount: 22, isOrganic: false },
  { id: 'p21', name: 'Lemons', farmer: 'Kayunga Organics', price: 1500, unit: 'piece', category: 'fruits', rating: 4.3, reviewCount: 15, isOrganic: true },

  // Dairy & Eggs (6 products)
  { id: 'p4', name: 'Free-Range Eggs (tray)', farmer: 'Mukono Poultry', price: 8000, unit: 'tray', category: 'dairy_eggs', rating: 4.7, reviewCount: 35, isOrganic: true },
  { id: 'p12', name: 'Fresh Milk (1L)', farmer: 'Mbarara Dairy', price: 5000, unit: 'litre', category: 'dairy_eggs', rating: 4.8, reviewCount: 52, isOrganic: false },
  { id: 'p22', name: 'Cheese Block', farmer: 'Mbarara Dairy', price: 12000, unit: 'kg', category: 'dairy_eggs', rating: 4.6, reviewCount: 18, isOrganic: false },
  { id: 'p23', name: 'Yogurt', farmer: 'Mbarara Dairy', price: 4000, unit: 'cup', category: 'dairy_eggs', rating: 4.5, reviewCount: 29, isOrganic: false },
  { id: 'p24', name: 'Farm Fresh Butter', farmer: 'Mbarara Dairy', price: 7000, unit: 'kg', category: 'dairy_eggs', rating: 4.7, reviewCount: 14, isOrganic: true },
  { id: 'p25', name: 'Organic Eggs (6)', farmer: 'Mukono Poultry', price: 4500, unit: 'pack', category: 'dairy_eggs', rating: 4.6, reviewCount: 23, isOrganic: true },

  // Grains (6 products)
  { id: 'p6', name: 'Groundnuts (1kg)', farmer: 'Gulu Grains', price: 6000, unit: 'kg', category: 'grains', rating: 4.4, reviewCount: 23, isOrganic: true },
  { id: 'p9', name: 'Posho (Maize Flour)', farmer: 'Gulu Grains', price: 3500, unit: 'kg', category: 'grains', rating: 4.3, reviewCount: 31, isOrganic: false },
  { id: 'p26', name: 'Rice', farmer: 'Gulu Grains', price: 5000, unit: 'kg', category: 'grains', rating: 4.5, reviewCount: 28, isOrganic: false },
  { id: 'p27', name: 'Sorghum Flour', farmer: 'Gulu Grains', price: 4000, unit: 'kg', category: 'grains', rating: 4.2, reviewCount: 12, isOrganic: true },
  { id: 'p28', name: 'Millet Flour', farmer: 'Gulu Grains', price: 4500, unit: 'kg', category: 'grains', rating: 4.3, reviewCount: 16, isOrganic: true },
  { id: 'p29', name: 'Beans', farmer: 'Gulu Grains', price: 5000, unit: 'kg', category: 'grains', rating: 4.5, reviewCount: 34, isOrganic: false },

  // Fish & Meat (6 products)
  { id: 'p7', name: 'Fresh Tilapia', farmer: 'Jinja Fish Farms', price: 12000, unit: 'kg', category: 'fish_meat', rating: 4.9, reviewCount: 67, isOrganic: false },
  { id: 'p8', name: 'Local Chicken', farmer: 'Mukono Poultry', price: 25000, unit: 'whole', category: 'fish_meat', rating: 4.8, reviewCount: 44, isOrganic: true },
  { id: 'p30', name: 'Beef (1kg)', farmer: 'Mbarara Dairy', price: 15000, unit: 'kg', category: 'fish_meat', rating: 4.6, reviewCount: 37, isOrganic: false },
  { id: 'p31', name: 'Pork (1kg)', farmer: 'Mukono Poultry', price: 12000, unit: 'kg', category: 'fish_meat', rating: 4.4, reviewCount: 19, isOrganic: false },
  { id: 'p32', name: 'Mukene', farmer: 'Jinja Fish Farms', price: 8000, unit: 'kg', category: 'fish_meat', rating: 4.5, reviewCount: 26, isOrganic: false },
  { id: 'p33', name: 'Grasshoppers (Nsenene)', farmer: 'Mama Mboga Farm', price: 10000, unit: 'kg', category: 'fish_meat', rating: 4.7, reviewCount: 33, isOrganic: true },

  // Herbs & Spices (5 products)
  { id: 'p10', name: 'Fresh Ginger', farmer: 'Mama Mboga Farm', price: 1500, unit: 'piece', category: 'herbs', rating: 4.6, reviewCount: 15, isOrganic: true },
  { id: 'p34', name: 'Garlic', farmer: 'Kayunga Organics', price: 2000, unit: 'piece', category: 'herbs', rating: 4.5, reviewCount: 21, isOrganic: true },
  { id: 'p35', name: 'Fresh Dill', farmer: 'Mama Mboga Farm', price: 1000, unit: 'bunch', category: 'herbs', rating: 4.3, reviewCount: 8, isOrganic: true },
  { id: 'p36', name: 'Cloves', farmer: 'Kayunga Organics', price: 3000, unit: 'pack', category: 'herbs', rating: 4.4, reviewCount: 12, isOrganic: false },
  { id: 'p37', name: 'Cinnamon Sticks', farmer: 'Mama Mboga Farm', price: 2500, unit: 'pack', category: 'herbs', rating: 4.2, reviewCount: 10, isOrganic: false },

  // Legumes (5 products)
  { id: 'p38', name: 'Dried Beans', farmer: 'Gulu Grains', price: 5000, unit: 'kg', category: 'legumes', rating: 4.5, reviewCount: 28, isOrganic: true },
  { id: 'p39', name: 'Cowpeas', farmer: 'Gulu Grains', price: 4500, unit: 'kg', category: 'legumes', rating: 4.3, reviewCount: 16, isOrganic: false },
  { id: 'p40', name: 'Soybeans', farmer: 'Gulu Grains', price: 4000, unit: 'kg', category: 'legumes', rating: 4.2, reviewCount: 14, isOrganic: true },
  { id: 'p41', name: 'Peas', farmer: 'Kayunga Organics', price: 6000, unit: 'kg', category: 'legumes', rating: 4.4, reviewCount: 19, isOrganic: true },
  { id: 'p42', name: 'Lentils', farmer: 'Gulu Grains', price: 7000, unit: 'kg', category: 'legumes', rating: 4.6, reviewCount: 22, isOrganic: false },
];

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: 'all' },
  { id: 'vegetables', name: 'Vegetables', icon: 'vegetables' },
  { id: 'fruits', name: 'Fruits', icon: 'fruits' },
  { id: 'dairy_eggs', name: 'Dairy & Eggs', icon: 'dairy_eggs' },
  { id: 'grains', name: 'Grains', icon: 'grains' },
  { id: 'legumes', name: 'Legumes', icon: 'legumes' },
  { id: 'fish_meat', name: 'Fish & Meat', icon: 'fish_meat' },
  { id: 'herbs', name: 'Herbs & Spices', icon: 'herbs' },
];

export interface UseDiscoverViewModelReturn {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  sortBy: 'popular' | 'price_low' | 'price_high';
  onCategorySelect: (categoryId: string) => void;
  onSortChange: (sort: 'popular' | 'price_low' | 'price_high') => void;
  onProductPress: (product: Product) => void;
}

export function useDiscoverViewModel(): UseDiscoverViewModelReturn {
  const params = useLocalSearchParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState(params.category ?? 'all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high'>('popular');

  const onCategorySelect = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const onSortChange = useCallback((sort: 'popular' | 'price_low' | 'price_high') => {
    setSortBy(sort);
  }, []);

  const onProductPress = useCallback((product: Product) => {
    navigateTo(`/product/${product.id}`);
  }, []);

  const products = useMemo(() => {
    let filtered = activeCategory === 'all'
      ? [...ALL_PRODUCTS]
      : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [activeCategory, sortBy]);

  return {
    products,
    categories: CATEGORIES,
    activeCategory,
    sortBy,
    onCategorySelect,
    onSortChange,
    onProductPress,
  };
}