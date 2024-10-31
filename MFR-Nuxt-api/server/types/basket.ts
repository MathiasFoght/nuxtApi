export type LineItem = {
  discountPercentage: number;
  price: number;
  quantity: number;
  title: string;
  sku: string;
};

export type BasketData = {
  totalPrice: number;
  lineItems: LineItem[];
  totalQuantity: number;
};
