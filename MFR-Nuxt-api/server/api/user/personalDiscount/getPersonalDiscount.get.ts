import { createUserObject } from "~/server/api/user/helpers";

createUserObject();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const userId = query.userId;

    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "User ID is required" }),
        };
    }

    const discount = 25;
    return { discount };
});