import {
  defaultBasketData,
  createBasketData,
} from "~/server/api/basket/helpers";

createBasketData();

export default defineEventHandler(async (event) => {
  global._BASKET_DATA = defaultBasketData();

  return global._BASKET_DATA;
});
