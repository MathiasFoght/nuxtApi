import { createBasketData } from "~/server/api/basket/helpers";

createBasketData();

export default defineEventHandler(async (event) => {
  return global._BASKET_DATA;
});
