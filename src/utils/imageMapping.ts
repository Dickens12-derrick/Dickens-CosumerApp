/**
 * Image mapping utility for agriculture products
 * Maps product names, categories, and UI icons to actual image assets
 */

// Category icon images (using product images as visual representations)
export const categoryIconMap: { [key: string]: any } = {
  vegetables: require('../../assets/images/cabbage1.jpg'),
  fruits: require('../../assets/images/mango.jpg'),
  dairy_eggs: require('../../assets/images/egg2.jpg'),
  grains: require('../../assets/images/yellowmaize.jpg'),
  fish_meat: require('../../assets/images/tilapiafish.jpeg'),
  herbs: require('../../assets/images/sukumawiki.jpg'),
  legumes: require('../../assets/images/beans2.jpg'),
};

// UI icon images — using available product/photo assets as visual representations
export const uiIconMap: { [key: string]: any } = {
  // Tab icons — dedicated tab icon assets
  home: require('@/assets/images/tabIcons/home-button.png'),
  search: require('../../assets/images/tabIcons/search.png'),
  // explore: require('../../assets/images/tabIcons/receive-email.png'),
  discover: require('@/assets/images/tabIcons/discover1.png'),
  cart: require('../../assets/images/tabIcons/carts.png'),
  profile: require('@/assets/images/tabIcons/profile.png'),

  // Onboarding / auth
  leaf: require('../../assets/images/e katale logo.jpg'),
  phone: require('../../assets/images/tabIcons/phone-call.png'),
  lock: require('../../assets/images/egg2.jpg'),
  message: require('@/assets/images/tabIcons/chat.png'),
  Shop: require('../../assets/images/shopping-cart.png'),

  // Location
  mapPin: require('../../assets/images/tabIcons/map.png'),
  target: require('../../assets/images/tabIcons/target.png'),
  other: require('../../assets/images/tabIcons/ellipse.png'),
  work: require('../../assets/images/tabIcons/working.png'),

  // Orders / Cart
  package: require('../../assets/images/tabIcons/shopping.png'),

  // Payment
  cash: require('../../assets/images/tabIcons/payment.png'),
  card: require('../../assets/images/tabIcons/credit-card.png'),
  mobile_money: require('../../assets/images/tabIcons/pay.png'),

  // Profile menu
  orders: require('../../assets/images/tabIcons/order-now.png'),
  addresses: require('../../assets/images/tabIcons/delivery-address.png'),
  favorites: require('../../assets/images/tabIcons/star.png'),
  notifications: require('../../assets/images/tabIcons/bell.png'),
  help: require('../../assets/images/tabIcons/help-desk.png'),
  about: require('../../assets/images/tabIcons/person.png'),
};

export const productImageMap: { [key: string]: any } = {
  // Fruits
  'Ripe Avocados': require('../../assets/images/avocado ready.jpg'),
  // 'Fresh Mango': require('../../assets/images/mango.jpg'),
  'Mango': require('../../assets/images/mango.jpg'),
  // 'Fresh Mangoes': require('../../assets/images/mango.jpg'),
  'Yellow Banana': require('../../assets/images/banana.jpg'),
  'Sweet Bananas': require('../../assets/images/banana.jpg'),
  // 'Fresh Bananas': require('../../assets/images/banana.jpg'),
  // 'Banana': require('../../assets/images/banana.jpg'),
  // 'sweet Bananas': require('../../assets/images/banana.jpg'),
  // 'Sweet Bananas': require('../../assets/images/banana.jpg'),
  'Pineapple': require('../../assets/images/pinapples.jpg'),
  'Watermelon': require('../../assets/images/watermelon.jpeg'),
  'Oranges': require('../../assets/images/orange.jpeg'),
  'Lemons': require('../../assets/images/lemon.jpeg'),

  // Vegetables
  'Organic Sukuma Wiki': require('../../assets/images/sukuma.jpg'),
  'Cabbage': require('../../assets/images/cabbage1.jpg'),
  'Fresh Cabbage': require('../../assets/images/cabbage1.jpg'),
  'Fresh Matoke': require('../../assets/images/matooke.jpg'),
  'Organic Tomatoes': require('../../assets/images/tomato.jpg'),
  'Broccoli': require('../../assets/images/broccoli.jpeg'),
  'Sweet Corn': require('../../assets/images/corn.jpeg'),
  

  // Legumes & Grains
  'Organic Beans': require('../../assets/images/beans2.jpg'),
  'Fresh Beans': require('../../assets/images/beans2.jpg'),
  'Beans': require('../../assets/images/beans2.jpg'),
  'Dried Beans': require('../../assets/images/dry beans.jpg'),
  'Black Beans': require('../../assets/images/beans2.jpg'),
  'Groundnuts (1kg)': require('../../assets/images/groundnuts.jpeg'),
  'Posho (Maize Flour)': require('../../assets/images/posho.jpeg'),
  'Rice': require('../../assets/images/rice.jpeg'),
  'Sorghum Flour': require('../../assets/images/sorghum.jpeg'),
  'Millet Flour': require('../../assets/images/millet.jpeg'),
  'Cowpeas': require('../../assets/images/cowpeas.jpeg'),
  'Soybeans': require('../../assets/images/soybeans.jpeg'),
  'Peas': require('../../assets/images/peas.jpeg'),
  'Lentils': require('../../assets/images/lentils.jpeg'),
  'Green Beans': require('../../assets/images/greenbeans.jpeg'),

  // Dairy & Eggs
  'Free-Range Eggs (tray)': require('../../assets/images/eggs1.jpg'),
  'Fresh Eggs': require('../../assets/images/egg2.jpg'),
  'Eggs': require('../../assets/images/egg2.jpg'),
  'Organic Eggs': require('../../assets/images/eggs1.jpg'),
  'Farm Fresh Eggs': require('../../assets/images/eggs1.jpg'),
  'Fresh Milk (1L)': require('../../assets/images/fresh milk.jpeg'),
  'Cheese Block': require('../../assets/images/cheeseblock.jpeg'),
  'Yogurt': require('../../assets/images/yogut.jpeg'),
  'Farm Fresh Butter': require('../../assets/images/butter.jpeg'),
  'Organic Eggs (6)': require('../../assets/images/eggs1.jpg'),

  // Fish & Meat
  'Fresh Tilapia': require('../../assets/images/tilapiafish.jpeg'),
  'Local Chicken': require('../../assets/images/localchicken.jpeg'),
  'Beef (1kg)': require('../../assets/images/beef.jpeg'),
  'Pork (1kg)': require('../../assets/images/pork.jpeg'),
  'Mukene': require('../../assets/images/silver fish.jpeg'),
  'Grasshoppers (Nsenene)': require('../../assets/images/grasshopper.jpeg'),

  // Herbs
  'Fresh Ginger': require('../../assets/images/fresh ginger.jpg'),
  'Garlic': require('../../assets/images/gallic.jpeg'),
  'Fresh Dill': require('../../assets/images/dill.jpeg'),
  'Cloves': require('../../assets/images/cloves.jpeg'),
  'Cinnamon Sticks': require('../../assets/images/cinnamonstick.jpeg'),

  // Fallbacks by category
  'fruits': require('../../assets/images/mango.jpg'),
  'vegetables': require('../../assets/images/sukuma.jpg'),
  'grains': require('../../assets/images/yellowmaize.jpg'),
  'dairy_eggs': require('../../assets/images/egg2.jpg'),
  'legumes': require('../../assets/images/beans2.jpg'),
  'fish_meat': require('../../assets/images/tilapiafish.jpeg'),
  'herbs': require('../../assets/images/sukumawiki.jpg'),
};

/**
 * Get image for a product based on name or category
 */
export function getProductImage(name?: string, category?: string): any {
  if (!name && !category) {
    return require('../../assets/images/mango.jpg');
  }

  // Try exact name match first
  if (name && productImageMap[name]) {
    return productImageMap[name];
  }

  // Try category match
  if (category && productImageMap[category]) {
    return productImageMap[category];
  }

  // Default fallback
  return require('../../assets/images/mango.jpg');
}

/**
 * Get image for a category icon
 */
export function getCategoryIcon(category: string): any {
  return categoryIconMap[category] || require('../../assets/images/mango.jpg');
}

/**
 * Get image for a UI icon
 */
export function getUiIcon(iconName: string): any {
  return uiIconMap[iconName] || require('../../assets/images/e katale logo.jpg');
}
