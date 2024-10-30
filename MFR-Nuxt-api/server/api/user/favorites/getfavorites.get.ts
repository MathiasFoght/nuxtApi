import { createUserObject } from "~/server/api/user/favorites/helpers";

createUserObject();

export default defineEventHandler(async (event) => {
  return global._USER_DATA_;
});
