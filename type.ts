export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
}