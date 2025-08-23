export interface Product {
  id: number;
  title: string;
  price: number;
}

export const products: Product[] = [
  { id: 1, title: "Rinso", price: 2000 },
  { id: 2, title: "Daia", price: 5000 },
  { id: 3, title: "Molto", price: 4000 },
];

export interface User {
  id: number;
  name: string;
}

export interface CartItem {
  userId: number;
  productId: number;
  quantity: number;
}

export const carts: CartItem[] = [
  { userId: 1, productId: 1, quantity: 2 },
  { userId: 1, productId: 2, quantity: 1 },
];

