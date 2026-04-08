import { get } from "@/app/common/util/fetch";
import { OrderHistoryOrder } from "@/app/orders/actions/get-orders";

export default async function getMyOrders() {
    return get<OrderHistoryOrder[]>("checkout/my-orders");
}
