import { Product } from "./interfaces/product.interface";

const zeroStock = {
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
};

const shirtBlackStock = {
    XS: 10,
    S: 15,
    M: 20,
    L: 12,
    XL: 8,
};

const shirtWhiteStock = {
    XS: 8,
    S: 12,
    M: 18,
    L: 10,
    XL: 6,
};

const hoodieBlackStock = {
    XS: 6,
    S: 10,
    M: 12,
    L: 9,
    XL: 5,
};

const hoodieWhiteStock = {
    XS: 5,
    S: 8,
    M: 10,
    L: 7,
    XL: 4,
};

const blackShirtProduct: Product = {
    id: 1,
    name: "Nightline Black Tee",
    description: "Soft premium cotton tee inspired by Salzburg night events.",
    price: 39.99,
    colors: ["black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stockByColorAndSize: {
        black: shirtBlackStock,
        white: zeroStock,
    },
    imagesByColor: {
        black: [
            "/products/classic-shirt/black-1.svg",
            "/products/classic-shirt/black-2.svg",
            "/products/classic-shirt/black-3.svg",
        ],
        white: [
            "/products/classic-shirt/white-1.svg",
            "/products/classic-shirt/white-2.svg",
            "/products/classic-shirt/white-3.svg",
        ],
    },
};

const whiteShirtProduct: Product = {
    id: 2,
    name: "Snowline White Tee",
    description: "Soft premium cotton tee inspired by Salzburg winter mornings.",
    price: 39.99,
    colors: ["white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stockByColorAndSize: {
        black: zeroStock,
        white: shirtWhiteStock,
    },
    imagesByColor: {
        black: [
            "/products/classic-shirt/black-1.svg",
            "/products/classic-shirt/black-2.svg",
            "/products/classic-shirt/black-3.svg",
        ],
        white: [
            "/products/classic-shirt/white-1.svg",
            "/products/classic-shirt/white-2.svg",
            "/products/classic-shirt/white-3.svg",
        ],
    },
};

const blackHoodieProduct: Product = {
    id: 3,
    name: "Nightline Black Hoodie",
    description: "Heavyweight hoodie with a brushed interior for colder evenings.",
    price: 59.99,
    colors: ["black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stockByColorAndSize: {
        black: hoodieBlackStock,
        white: zeroStock,
    },
    imagesByColor: {
        black: [
            "/products/classic-hoodie/black-1.svg",
            "/products/classic-hoodie/black-2.svg",
            "/products/classic-hoodie/black-3.svg",
        ],
        white: [
            "/products/classic-hoodie/white-1.svg",
            "/products/classic-hoodie/white-2.svg",
            "/products/classic-hoodie/white-3.svg",
        ],
    },
};

const whiteHoodieProduct: Product = {
    id: 4,
    name: "Snowline White Hoodie",
    description: "Heavyweight hoodie with a brushed interior for chilly mornings.",
    price: 59.99,
    colors: ["white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stockByColorAndSize: {
        black: zeroStock,
        white: hoodieWhiteStock,
    },
    imagesByColor: {
        black: [
            "/products/classic-hoodie/black-1.svg",
            "/products/classic-hoodie/black-2.svg",
            "/products/classic-hoodie/black-3.svg",
        ],
        white: [
            "/products/classic-hoodie/white-1.svg",
            "/products/classic-hoodie/white-2.svg",
            "/products/classic-hoodie/white-3.svg",
        ],
    },
};

export const productsCatalog: Product[] = [
    whiteShirtProduct,
    whiteHoodieProduct,
    blackShirtProduct,
    blackHoodieProduct,
];
