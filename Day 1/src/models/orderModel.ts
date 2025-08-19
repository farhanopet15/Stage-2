export interface OrderItem {
    productId: number;
    name: string;
    price: number;
}

export interface Order {
    id: number;
    items: OrderItem[];
    total: number;
    createdAt: Date;
}

export const orders: Order[] = [];