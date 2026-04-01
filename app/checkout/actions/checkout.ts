"use server";

import { post } from "@/app/common/util/fetch";
import { ShirtColor, ShirtSize } from "@/app/products/interfaces/product.interface";

interface CheckoutItemRequest {
    productId: number;
    color: ShirtColor;
    size: ShirtSize;
    quantity: number;
}

interface CheckoutRequest {
    items: CheckoutItemRequest[];
    deliveryAddress: {
        fullName: string;
        phone?: string;
        line1: string;
        line2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
}

export default async function checkout(request: CheckoutRequest) {
    return post("checkout/session", request);
}
