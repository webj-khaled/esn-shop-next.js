import { get } from "@/app/common/util/fetch";

export interface OrderHistoryItem {
    id: number;
    productName: string;
    productDescription: string | null;
    shirtColor: string | null;
    shirtSize: string | null;
    quantity: number;
    unitAmount: number;
    totalAmount: number;
}

export interface OrderHistoryOrder {
    id: number;
    stripeSessionId: string;
    totalAmount: number;
    currency: string;
    customerEmail: string | null;
    deliveryAddress: {
        fullName: string;
        phone: string | null;
        line1: string;
        line2: string | null;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    createdAt: string;
    items: OrderHistoryItem[];
}

export default async function getOrders() {
    return get<OrderHistoryOrder[]>("checkout/orders");
}
