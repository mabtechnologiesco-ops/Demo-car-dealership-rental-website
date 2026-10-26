export type Transmission = 'Automatic' | 'Manual';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type Category = 'Sedan' | 'SUV' | 'Sports' | 'Compact' | 'Luxury';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year?: number;
  category: Category;
  transmission: Transmission;
  fuelType: FuelType;
  seats: number;
  image: string;
  /** Sale price (USD) for dealership vehicles */
  price?: number;
  /** Daily rental rate (USD) for rental vehicles */
  dailyRate?: number;
  mileage?: number;
  description: string;
}

// Local images served from /public/cars (same-origin, no external requests)
export const vehicles: Vehicle[] = [
  // --- Rentals ---
  {
    id: 'rent-corolla',
    make: 'Toyota',
    model: 'Corolla',
    category: 'Compact',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    dailyRate: 45,
    image: '/cars/rent-corolla.jpg',
    description: 'A reliable and fuel-efficient compact sedan, perfect for city driving and everyday commutes.',
  },
  {
    id: 'rent-accord',
    make: 'Honda',
    model: 'Accord',
    category: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    dailyRate: 60,
    image: '/cars/rent-accord.jpg',
    description: 'A refined midsize sedan offering a smooth ride, spacious cabin, and dependable performance.',
  },
  {
    id: 'rent-rav4',
    make: 'Toyota',
    model: 'RAV4',
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    dailyRate: 75,
    image: '/cars/rent-rav4.jpg',
    description: 'A versatile crossover SUV with all-road capability, generous cargo space, and hybrid efficiency.',
  },
  {
    id: 'rent-tucson',
    make: 'Hyundai',
    model: 'Tucson',
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    dailyRate: 80,
    image: '/cars/rent-tucson.jpg',
    description: 'A bold, tech-forward SUV with a comfortable interior and confident handling for any trip.',
  },
  {
    id: 'rent-cclass',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    category: 'Luxury',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    dailyRate: 120,
    image: '/cars/rent-cclass.jpg',
    description: 'A premium luxury sedan with elegant styling, refined materials, and an effortless drive.',
  },
  {
    id: 'rent-landcruiser',
    make: 'Toyota',
    model: 'Land Cruiser',
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    dailyRate: 150,
    image: '/cars/rent-landcruiser.jpg',
    description: 'A legendary, go-anywhere SUV built for adventure with seating for seven and serious capability.',
  },

  // --- For Sale ---
  {
    id: 'sale-corolla-2022',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    category: 'Compact',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    price: 18500,
    mileage: 24800,
    image: '/cars/sale-corolla.jpg',
    description: 'A low-mileage compact sedan in excellent condition, with a clean history and economical running costs.',
  },
  {
    id: 'sale-civic-2021',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    category: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    price: 19900,
    mileage: 31500,
    image: '/cars/sale-civic.jpg',
    description: 'A sporty and dependable sedan known for its engaging drive, roomy cabin, and strong resale value.',
  },
  {
    id: 'sale-tucson-2023',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    price: 27500,
    mileage: 18200,
    image: '/cars/sale-tucson.jpg',
    description: 'A modern hybrid SUV with striking design, advanced safety tech, and impressive fuel economy.',
  },
  {
    id: 'sale-rav4-2022',
    make: 'Toyota',
    model: 'RAV4',
    year: 2022,
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    price: 29900,
    mileage: 26600,
    image: '/cars/sale-rav4.jpg',
    description: 'A practical and popular hybrid crossover with all-wheel-drive confidence and low running costs.',
  },
  {
    id: 'sale-cclass-2021',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2021,
    category: 'Luxury',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    price: 34500,
    mileage: 33900,
    image: '/cars/sale-cclass.jpg',
    description: 'A beautifully kept luxury sedan with premium finishes, refined ride quality, and a quiet cabin.',
  },
  {
    id: 'sale-x5-2022',
    make: 'BMW',
    model: 'X5',
    year: 2022,
    category: 'Luxury',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 5,
    price: 52000,
    mileage: 28700,
    image: '/cars/sale-x5.jpg',
    description: 'A commanding luxury SUV blending performance, comfort, and technology in a versatile package.',
  },
  {
    id: 'sale-landcruiser-2021',
    make: 'Toyota',
    model: 'Land Cruiser',
    year: 2021,
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    price: 58000,
    mileage: 41200,
    image: '/cars/sale-landcruiser.jpg',
    description: 'A rugged yet refined full-size SUV built for endurance, comfort, and off-road adventure.',
  },
  {
    id: 'sale-911-2020',
    make: 'Porsche',
    model: '911',
    year: 2020,
    category: 'Sports',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 4,
    price: 89000,
    mileage: 19400,
    image: '/cars/sale-911.jpg',
    description: 'An iconic sports car delivering exhilarating performance, timeless design, and engineering excellence.',
  },
];

export const rentalVehicles = vehicles.filter((v) => v.dailyRate !== undefined);
export const saleVehicles = vehicles.filter((v) => v.price !== undefined);

export const heroImage = '/cars/hero.jpg';

export const featuredImage = '/cars/featured.jpg';

// Configurable brand + contact details (placeholders to replace)
export const BRAND = {
  name: 'VELOX MOTORS',
  phone: '+1 (000) 000-0000',
  email: 'hello@veloxmotors.com',
  address: '1200 Auto Boulevard, City, Country',
  hours: 'Mon–Sat: 9:00 AM – 7:00 PM · Sun: Closed',
};

// Configure with the client's international WhatsApp number, digits only, no + or spaces.
// Example: "15551234567". Leave as-is to show a development placeholder.
export const WHATSAPP_NUMBER = 'REPLACE_WITH_CLIENT_NUMBER';
export const WHATSAPP_MESSAGE =
  'Hello! I would like to learn more about your car rental and dealership services.';

export const categories: Category[] = ['Sedan', 'SUV', 'Sports', 'Compact', 'Luxury'];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-US').format(miles) + ' mi';
}

export function genReference(prefix: string): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${n}`;
}
