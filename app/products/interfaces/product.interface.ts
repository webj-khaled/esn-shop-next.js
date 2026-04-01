export const SHIRT_COLORS = ["black", "white"] as const;
export const SHIRT_SIZES = ["XS", "S", "M", "L", "XL"] as const;

export type ShirtColor = (typeof SHIRT_COLORS)[number];
export type ShirtSize = (typeof SHIRT_SIZES)[number];

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    colors: ShirtColor[];
    sizes: ShirtSize[];
    stockByColorAndSize: Record<ShirtColor, Record<ShirtSize, number>>;
}
