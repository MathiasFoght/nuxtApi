import type { Favorite } from "~/server/types/user";
import { createUserObject } from "~/server/api/user/favorites/helpers";

createUserObject();

export default defineEventHandler(async (event) => {
  const body: Favorite = await readBody(event);

  if (!body.sku || body.sku.trim() === "") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "SKU is not valid" }),
    };
  }

  const index = global._USER_DATA_.favorites.findIndex(
    (item: Favorite) => item.sku === body.sku
  );

  if (index !== -1) {
    // Remove item if it exists
    global._USER_DATA_.favorites.splice(index, 1);
  } else {
    // Add item if it does not exist
    global._USER_DATA_.favorites.push(body);
  }

  return global._USER_DATA_;
});
