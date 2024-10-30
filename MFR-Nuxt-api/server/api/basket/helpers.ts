import type { BasketData } from "~/server/types/basket";
declare global {
  var _BASKET_DATA: BasketData;
}
export function defaultBasketData(): BasketData {
  return {
    totalPrice: 0,
    lineItems: [],
    totalQuantity: 0,
    userDiscount: 0,
  };
}

export function createBasketData(): void {
  global._BASKET_DATA = global._BASKET_DATA || defaultBasketData();
}
