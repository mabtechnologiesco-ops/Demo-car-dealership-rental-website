import { vehicles, rentalVehicles, saleVehicles, formatCurrency } from '@/data/vehicles';
import type { Vehicle } from '@/data/vehicles';

export interface ChatResult {
  text: string;
  vehicles?: Vehicle[];
}

const lower = (s: string) => s.toLowerCase();

function findVehicles(q: string, pool: Vehicle[]): Vehicle[] {
  const s = lower(q);
  return pool.filter((v) => {
    const hay = `${v.make} ${v.model} ${v.category} ${v.fuelType} ${v.transmission}`.toLowerCase();
    return s.split(/\s+/).some((tok) => tok.length > 2 && hay.includes(tok));
  });
}

function cheapest(pool: Vehicle[]): Vehicle | undefined {
  return [...pool].sort((a, b) => {
    const pa = a.dailyRate ?? a.price ?? Infinity;
    const pb = b.dailyRate ?? b.price ?? Infinity;
    return pa - pb;
  })[0];
}

export function answer(query: string): ChatResult {
  const s = lower(query.trim());

  if (!s) return { text: 'Could you rephrase that? I can help with rentals, vehicles for sale, pricing, and how to book or buy.' };

  // Greetings
  if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))\b/.test(s)) {
    return {
      text:
        "Hello! I'm the Velox Virtual Assistant, a demo helper. I can tell you about our rental fleet and cars for sale, find vehicles by category, show prices, and explain how booking and enquiries work. What would you like to know?",
    };
  }

  const wantsRent = /rent|rental|hiring|hire/.test(s);
  const wantsSale = /sale|buy|purchase|dealership|for sale/.test(s);
  const wantsSuv = /suv/.test(s);
  const wantsSedan = /sedan/.test(s);
  const wantsSports = /sports|sport car|sportscar/.test(s);
  const wantsLuxury = /luxury|premium/.test(s);
  const wantsCompact = /compact/.test(s);

  // Cheapest
  if (/cheapest|lowest|most affordable|budget|cheapest car/.test(s)) {
    const pool = wantsSale ? saleVehicles : wantsRent ? rentalVehicles : vehicles;
    const c = cheapest(pool);
    if (!c) return { text: "I couldn't find any matching vehicles." };
    const price = c.dailyRate != null ? `${formatCurrency(c.dailyRate)}/day (rental)` : formatCurrency(c.price!);
    return {
      text: `The most affordable ${wantsSale ? 'car for sale' : wantsRent ? 'rental' : 'vehicle'} is the ${c.make} ${c.model} at ${price}.`,
      vehicles: [c],
    };
  }

  // Rental cost / estimate
  if (/cost to rent|rental cost|how much.*rent|price.*rent|rent.*price/.test(s) && !/which|what car/.test(s)) {
    const min = Math.min(...rentalVehicles.map((v) => v.dailyRate!));
    const max = Math.max(...rentalVehicles.map((v) => v.dailyRate!));
    const daysMatch = s.match(/(\d+)\s*day/);
    if (daysMatch) {
      const days = Number(daysMatch[1]);
      const c = cheapest(rentalVehicles)!;
      return {
        text: `Rental rates range from ${formatCurrency(min)}/day to ${formatCurrency(max)}/day. For ${days} day(s) with the cheapest option (${c.make} ${c.model} at ${formatCurrency(c.dailyRate!)}/day), the estimate would be about ${formatCurrency(c.dailyRate! * days)}. Use the rental booking form to pick exact dates.`,
        vehicles: [c],
      };
    }
    return {
      text: `Our daily rental rates range from ${formatCurrency(min)}/day to ${formatCurrency(max)}/day depending on the vehicle. Tell me a number of days and I can estimate a total.`,
      vehicles: rentalVehicles.slice(0, 3),
    };
  }

  // How to book / buy
  if (/how.*(book|rent)|book.*(car|rental)|rental process|rent.*work/.test(s)) {
    return {
      text:
        "To rent a car: browse the 'Rent a Car' section, pick a vehicle, and click 'Rent This Car' to open the demo booking form. Enter your details, pickup location, and pickup/return dates — the estimated total is calculated automatically. This is a demo, so no booking is stored or charged.",
    };
  }
  if (/how.*(buy|purchase)|buy.*process|enquir|enquiry|purchase process/.test(s)) {
    return {
      text:
        "To buy a car: browse the 'Cars for Sale' section, pick a vehicle, and click 'Enquire to Buy' to open the demo enquiry form. Submit your contact details and we'll follow up. This is a demo, so no enquiry is actually sent or stored.",
    };
  }

  // Available rentals
  if ((wantsRent || /available|what.*cars|show.*cars|list/.test(s)) && !wantsSale) {
    let pool: Vehicle[] = rentalVehicles;
    if (wantsSuv) pool = pool.filter((v) => v.category === 'SUV');
    else if (wantsSedan) pool = pool.filter((v) => v.category === 'Sedan');
    else if (wantsSports) pool = pool.filter((v) => v.category === 'Sports');
    else if (wantsLuxury) pool = pool.filter((v) => v.category === 'Luxury');
    else if (wantsCompact) pool = pool.filter((v) => v.category === 'Compact');
    if (pool.length === 0) {
      return { text: "I couldn't find rental vehicles matching that. Our rentals include Compact, Sedan, SUV, and Luxury categories." };
    }
    return {
      text: `Here ${pool.length === 1 ? 'is the rental vehicle' : `are ${pool.length} rental vehicles`} I found:`,
      vehicles: pool,
    };
  }

  // SUVs for sale
  if (wantsSale && (wantsSuv || wantsSedan || wantsSports || wantsLuxury || wantsCompact)) {
    let pool = saleVehicles;
    if (wantsSuv) pool = pool.filter((v) => v.category === 'SUV');
    else if (wantsSedan) pool = pool.filter((v) => v.category === 'Sedan');
    else if (wantsSports) pool = pool.filter((v) => v.category === 'Sports');
    else if (wantsLuxury) pool = pool.filter((v) => v.category === 'Luxury');
    else if (wantsCompact) pool = pool.filter((v) => v.category === 'Compact');
    if (pool.length === 0) return { text: "I couldn't find any vehicles for sale in that category." };
    return { text: `Here ${pool.length === 1 ? 'is a vehicle' : `are ${pool.length} vehicles`} for sale I found:`, vehicles: pool };
  }

  // General sale list
  if (wantsSale) {
    return {
      text: "We have several cars for sale. Here are some highlights — use the filters on the sales section to narrow by price, category, or transmission.",
      vehicles: saleVehicles.slice(0, 4),
    };
  }

  // General rentals
  if (wantsRent) {
    return {
      text: "Our rental fleet includes compacts, sedans, SUVs, and luxury vehicles. Here are a few — use the filters on the rental section to narrow by category or price.",
      vehicles: rentalVehicles.slice(0, 4),
    };
  }

  // Category-only queries (no rent/sale specified)
  if (wantsSuv || wantsSedan || wantsSports || wantsLuxury || wantsCompact) {
    const cat = wantsSuv ? 'SUV' : wantsSedan ? 'Sedan' : wantsSports ? 'Sports' : wantsLuxury ? 'Luxury' : 'Compact';
    const pool = vehicles.filter((v) => v.category === cat);
    return {
      text: `Here are the ${cat} vehicles across our rental fleet and sales collection:`,
      vehicles: pool,
    };
  }

  // Name search fallback
  const matches = findVehicles(query, vehicles);
  if (matches.length > 0) {
    return {
      text: `I found ${matches.length} vehicle(s) matching "${query}":`,
      vehicles: matches,
    };
  }

  return {
    text:
      "I'm a demo assistant and don't have information on that. I can help with: available rentals, cars for sale, finding SUVs/sedans/luxury cars, the cheapest vehicle, rental cost estimates, and how to book or buy. Try one of the suggested questions below.",
  };
}

export const suggestedQuestions = [
  'What cars are available for rent?',
  'Show me SUVs for sale.',
  'Which car is cheapest?',
  'What does it cost to rent a car?',
  'How do I book or buy a car?',
];
