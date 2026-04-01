import { Alert, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import getOrders from "./actions/get-orders";
import { OrderHistoryOrder } from "./actions/get-orders";
import { getErrorMessage } from "../common/util/errors";

export default async function OrdersPage() {
    const maybeOrders = (await getOrders()) as unknown;
    const orders = Array.isArray(maybeOrders) ? (maybeOrders as OrderHistoryOrder[]) : [];
    const loadError = Array.isArray(maybeOrders)
        ? ""
        : getErrorMessage(maybeOrders);

    return (
        <Stack spacing={3} marginY={4}>
            <Typography variant="h3">Order History</Typography>
            {!!loadError && <Alert severity="error">{loadError}</Alert>}
            {!loadError && !orders.length && <Typography>No completed orders yet.</Typography>}

            {orders.map((order) => (
                <Card key={order.id}>
                    <CardContent>
                        <Stack spacing={1}>
                            <Typography variant="h6">
                                Order #{order.id} - {new Date(order.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                                Session: {order.stripeSessionId}
                            </Typography>
                            <Typography variant="body2">
                                Delivery: {order.deliveryAddress.fullName}, {order.deliveryAddress.line1}
                                {order.deliveryAddress.line2 ? `, ${order.deliveryAddress.line2}` : ""}
                                , {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
                                {order.deliveryAddress.postalCode}, {order.deliveryAddress.country}
                            </Typography>
                            <Typography variant="body2">
                                Phone: {order.deliveryAddress.phone ?? "N/A"}
                            </Typography>
                            <Typography variant="body2">
                                Email: {order.customerEmail ?? "N/A"}
                            </Typography>
                            <Divider />
                            {order.items.map((item) => (
                                <Stack key={item.id} direction="row" justifyContent="space-between">
                                    <Typography>
                                        {item.productName} x {item.quantity}
                                        {item.productDescription ? ` (${item.productDescription})` : ""}
                                    </Typography>
                                    <Typography>${item.totalAmount.toFixed(2)}</Typography>
                                </Stack>
                            ))}
                            <Divider />
                            <Typography variant="h6" textAlign="right">
                                Total: ${order.totalAmount.toFixed(2)} {order.currency}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
}
