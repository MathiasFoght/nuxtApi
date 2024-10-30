export type UserData = {
  favorites: Favorite[];
  discounts: Discount[];
};

export type Favorite = {
  sku: string;
};

export type Discount = {
    discount: number;
}