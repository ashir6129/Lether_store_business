import { CartItem } from "@/context/CartContext";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * WHATSAPP CHECKOUT CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * Target WhatsApp Business Phone Numbers (in international format without symbols)
 * Primary: +92 318 9102236
 * Secondary: +92 324 1732509
 */
export const WHATSAPP_NUMBERS = [
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_1 || "923241732509",
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_2 || "923189102236",
];

// Single export for backward compatibility
export const WHATSAPP_NUMBER = WHATSAPP_NUMBERS[0];

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
}

/**
 * Formats a single item price string (e.g. "£395") into numeric value.
 */
function parsePrice(priceStr: string): { amount: number; symbol: string } {
  const amount = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
  const symbol = priceStr.replace(/[0-9.,\s]/g, "") || "£";
  return { amount, symbol };
}

/**
 * Generates a clean, human-readable WhatsApp invoice message with complete item breakdown & size info.
 */
export function buildWhatsAppOrderMessage(
  items: CartItem[],
  totalStr: string,
  customerDetails?: CustomerDetails,
  discountPercentage: number = 0
): string {
  let message = "Hello! I would like to place an order.\n\n";

  // Customer Information (if provided)
  if (customerDetails && (customerDetails.fullName.trim() || customerDetails.phone.trim())) {
    message += "👤 CUSTOMER DETAILS\n";
    if (customerDetails.fullName.trim()) message += `Name: ${customerDetails.fullName.trim()}\n`;
    if (customerDetails.phone.trim()) message += `Phone: ${customerDetails.phone.trim()}\n`;
    if (customerDetails.email && customerDetails.email.trim()) message += `Email: ${customerDetails.email.trim()}\n`;
    if (customerDetails.city.trim()) message += `City: ${customerDetails.city.trim()}\n`;
    if (customerDetails.address.trim()) message += `Address: ${customerDetails.address.trim()}\n`;
    if (customerDetails.notes && customerDetails.notes.trim()) {
      message += `\n📝 Notes:\n${customerDetails.notes.trim()}\n`;
    }
    message += "\n";
  }

  // Order & Invoice Details Header
  message += "📄 ORDER INVOICE & ITEM BREAKDOWN\n\n";

  items.forEach((item, idx) => {
    const { amount, symbol } = parsePrice(item.price);
    const itemSubtotal = amount * item.qty;

    message += `${idx + 1}. ${item.name}\n`;
    message += `   Size: ${item.size}\n`;

    if (item.customMeasurements) {
      const { chest, length, armLength, notes } = item.customMeasurements;
      message += `   📐 Custom Made-to-Measure:\n`;
      if (chest) message += `      • Chest: ${chest}\n`;
      if (length) message += `      • Length: ${length}\n`;
      if (armLength) message += `      • Arm Length: ${armLength}\n`;
      if (notes) message += `      • Instructions: ${notes}\n`;
    }

    message += `   Quantity: ${item.qty}\n`;
    message += `   Price: ${item.price}\n`;
    message += `   Subtotal: ${symbol}${itemSubtotal.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}\n\n`;
  });

  // Total
  message += `💰 TOTAL AMOUNT: ${totalStr}\n`;
  if (discountPercentage > 0) {
    message += `(Includes ${(discountPercentage * 100).toFixed(0)}% Promo Discount)\n`;
  }

  message += "\nPlease confirm my order invoice and let me know the payment / delivery details.";

  return message;
}

export interface WhatsAppTarget {
  number: string;
  displayNumber: string;
  url: string;
}

/**
 * Returns WhatsApp click-to-chat URLs for all configured business numbers.
 */
export function getWhatsAppCheckoutUrls(
  items: CartItem[],
  totalStr: string,
  customerDetails?: CustomerDetails,
  discountPercentage: number = 0,
  numbers: string[] = WHATSAPP_NUMBERS
): WhatsAppTarget[] {
  const rawMessage = buildWhatsAppOrderMessage(items, totalStr, customerDetails, discountPercentage);
  const encodedMessage = encodeURIComponent(rawMessage);

  return numbers.map((num) => {
    const cleanNumber = num.replace(/[^0-9]/g, "");
    return {
      number: cleanNumber,
      displayNumber: num.startsWith("+") ? num : `+${num}`,
      url: `https://wa.me/${cleanNumber}?text=${encodedMessage}`,
    };
  });
}

/**
 * Single URL helper for backward compatibility.
 */
export function getWhatsAppCheckoutUrl(
  items: CartItem[],
  totalStr: string,
  customerDetails?: CustomerDetails,
  discountPercentage: number = 0,
  phoneNumber: string = WHATSAPP_NUMBER
): string {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  if (!cleanNumber) return "#";
  const rawMessage = buildWhatsAppOrderMessage(items, totalStr, customerDetails, discountPercentage);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(rawMessage)}`;
}
