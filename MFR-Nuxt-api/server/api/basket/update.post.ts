import type { LineItem } from "~/server/types/basket";
import { createBasketData } from "~/server/api/basket/helpers";

createBasketData();

export default defineEventHandler(async (event) => {
  const body: LineItem = await readBody(event);

  const validation = validateLineItem(body);
  if (!validation.valid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: validation.message }),
    };
  }

  //Indsæt eller fjern lineItem i kurv
  updateLineItems(body);

  //Beregn total antal lineItems i kurv
  updateBasketLineItemCount();

  //Beregn total pris i kurv
  updateBasketTotal();

  return global._BASKET_DATA;
});

function updateLineItems(lineItem: LineItem) {
  const existingItemIndex = global._BASKET_DATA.lineItems.findIndex(
    (item) => item.sku === lineItem.sku
  );

  if (existingItemIndex !== -1) {
    if (lineItem.quantity === 0) {
      // Fjern produktet fra kurven
      global._BASKET_DATA.lineItems.splice(existingItemIndex, 1);
    } else {
      // Opdater produktets data
      global._BASKET_DATA.lineItems[existingItemIndex] = lineItem;
    }
  } else if (lineItem.quantity > 0) {
    // Tilføj produktet til kurven
    global._BASKET_DATA.lineItems.push(lineItem);
  }
}

function updateBasketLineItemCount() {
  global._BASKET_DATA.totalQuantity = calculateTotalQuantity(global._BASKET_DATA.lineItems);
}


function calculateTotalQuantity(lineItems: LineItem[]): number {
  return lineItems.reduce((total, item) => total + item.quantity, 0);
}


let userDiscount = 0; // Startværdi som 0, opdateres hvis en personlig rabat hentes

export function updateBasketTotal() {
  global._BASKET_DATA.totalPrice = global._BASKET_DATA.lineItems.reduce((acc, lineItem) => {
    const discountedPrice = lineItem.price * (1 - lineItem.discountPercentage / 100);
    return acc + discountedPrice * lineItem.quantity;
  }, 0);
}








function validateLineItem(item: any): { valid: boolean; message?: string } {
  if (
    typeof item.discountPercentage !== "number" ||
    item.discountPercentage < 0 ||
    item.discountPercentage > 100
  ) {
    return { valid: false, message: "Invalid discountPercentage" };
  }
  if (typeof item.price !== "number" || item.price < 0) {
    return { valid: false, message: "Invalid price" };
  }
  if (typeof item.quantity !== "number" || item.quantity < 0) {
    return { valid: false, message: "Invalid quantity" };
  }
  if (typeof item.title !== "string" || item.title.trim() === "") {
    return { valid: false, message: "Invalid title" };
  }
  if (typeof item.sku !== "string" || item.sku.trim() === "") {
    return { valid: false, message: "Invalid sku" };
  }
  return { valid: true };
}
