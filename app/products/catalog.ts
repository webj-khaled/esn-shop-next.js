import { Product } from "./interfaces/product.interface";

export const SHIRT_PRODUCT_ID = 1;

const shirtProduct: Product = {
    id: SHIRT_PRODUCT_ID,
    name: "Classic Shirt",
    description: "Premium cotton shirt with a modern fit.",
    price: 39.99,
    colors: ["black", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stockByColorAndSize: {
        black: {
            XS: 10,
            S: 15,
            M: 20,
            L: 12,
            XL: 8,
        },
        white: {
            XS: 8,
            S: 12,
            M: 18,
            L: 10,
            XL: 6,
        },
    },
};

export const productsCatalog: Product[] = [shirtProduct];
