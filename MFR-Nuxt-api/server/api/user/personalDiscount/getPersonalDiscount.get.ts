import { createUserObject } from "~/server/api/user/personalDiscount/helpers";

createUserObject();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const userId = query.userId;

    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "User ID is required or user ID is invalid" }),
        };
    }

    const discount = 10;
    return { discount };
});