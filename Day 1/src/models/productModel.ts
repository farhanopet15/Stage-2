export interface Product {
    id: number;
    name: string;
    price: number;
}

export const products: Product[] = [
    { id: 1, name: 'Keyboard', price: 500000 },
    { id: 2, name: 'Mouse', price: 400000 },
    { id: 3, name: 'Monitor', price: 1500000 },
];