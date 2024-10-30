import type { UserData } from "~/server/types/user";

declare global {
    var _USER_DATA_: UserData;
}

export function createUserObject(): void {
    global._USER_DATA_ = global._USER_DATA_ || defaultUserData();
}

export function defaultUserData(): UserData {
    return {
        favorites: [],
        discounts: []
    };
}
