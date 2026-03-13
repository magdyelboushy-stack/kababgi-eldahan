export interface PlatterItem {
  id: string;
  name: string;
  nameEn: string;
  category: 'meat' | 'chicken' | 'sides';
  pricePerKg: number;   // Price per kg
  pricePerUnit?: number; // For sides (per piece)
  minWeight: number;     // Min weight in grams
  stepWeight: number;    // Weight step in grams
  maxWeight: number;     // Max weight in grams
  image: string;
  description: string;
}

export const platterItems: PlatterItem[] = [
  {
    id: 'kabab',
    name: 'كباب بتلو',
    nameEn: 'Kabab',
    category: 'meat',
    pricePerKg: 700,
    minWeight: 250,
    stepWeight: 250,
    maxWeight: 2000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'كباب بتلو بلدي على الفحم'
  },
  {
    id: 'kofta',
    name: 'كفتة مشوية',
    nameEn: 'Kofta',
    category: 'meat',
    pricePerKg: 650,
    minWeight: 250,
    stepWeight: 250,
    maxWeight: 2000,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'كفتة بخلطة الدهان السرية'
  },
  {
    id: 'tarb',
    name: 'طرب ضاني',
    nameEn: 'Tarb',
    category: 'meat',
    pricePerKg: 760,
    minWeight: 250,
    stepWeight: 250,
    maxWeight: 1500,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'طرب ضاني بلدي يذوب في الفم'
  },
  {
    id: 'ribs',
    name: 'ريش ضاني',
    nameEn: 'Lamb Ribs',
    category: 'meat',
    pricePerKg: 1100,
    minWeight: 250,
    stepWeight: 250,
    maxWeight: 1500,
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'ريش ضاني ممتازة متبلة'
  },
  {
    id: 'shish',
    name: 'شيش طاووق',
    nameEn: 'Shish Tawook',
    category: 'chicken',
    pricePerKg: 360,
    minWeight: 250,
    stepWeight: 250,
    maxWeight: 2000,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'قطع فراخ مشوية على الفحم'
  },
  {
    id: 'chicken',
    name: 'فراخ مشوية',
    nameEn: 'Grilled Chicken',
    category: 'chicken',
    pricePerKg: 440,
    minWeight: 500,
    stepWeight: 500,
    maxWeight: 2000,
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    description: 'فراخ كاملة مشوية على الفحم'
  },
];
