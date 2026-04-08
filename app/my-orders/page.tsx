import { Alert, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import { getErrorMessage } from "../common/util/errors";
import { OrderHistoryOrder } from "../orders/actions/get-orders";
import getMyOrders from "./actions/get-my-orders";
import { formatCurrency } from "../common/util/currency";

export default async function MyOrdersPage() {
    const maybeOrders = (await getMyOrders()) as unknown;
    const orders = Array.isArray(maybeOrders) ? (maybeOrders as OrderHistoryOrder[]) : [];
    const loadError = Array.isArray(maybeOrders) ? "" : getErrorMessage(maybeOrders);

    return (
        <Stack spacing={3} marginY={2} className="esn-fade-up">
            <Stack spacing={1}>
                <Chip label="Your account" color="info" sx={{ width: "fit-content" }} />
                <Typography variant="h3">My Orders</Typography>
            </Stack>
            {!!loadError && <Alert severity="error">{loadError}</Alert>}
            {!loadError && !orders.length && (
                <Typography>You have no completed orders yet.</Typography>
            )}

            {orders.map((order) => (
                <Card key={order.id} sx={{ overflow: "hidden" }}>
                    <CardContent sx={{ p: { xs: 2.2, md: 2.8 } }}>
                        <Stack spacing={1}>
                            <Typography variant="h6">
                                Order #{order.id} - {new Date(order.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Session: {order.stripeSessionId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Delivery: {order.deliveryAddress.fullName}, {order.deliveryAddress.line1}
                                {order.deliveryAddress.line2 ? `, ${order.deliveryAddress.line2}` : ""}
                                , {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
                                {order.deliveryAddress.postalCode}, {order.deliveryAddress.country}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone: {order.deliveryAddress.phone ?? "N/A"}
                            </Typography>
                            <Divider />
                            {order.items.map((item) => (
                                <Stack key={item.id} direction="row" justifyContent="space-between">
                                    <Typography>
                                        {item.productName} x {item.quantity}
                                        {(item.shirtColor || item.shirtSize) && (
                                            <>
                                                {" "}
                                                (
                                                {[
                                                    item.shirtColor ? `Color: ${item.shirtColor.toUpperCase()}` : "",
                                                    item.shirtSize ? `Size: ${item.shirtSize.toUpperCase()}` : "",
                                                ]
                                                    .filter(Boolean)
                                                    .join(" | ")}
                                                )
                                            </>
                                        )}
                                        {!item.shirtColor && !item.shirtSize && item.productDescription
                                            ? ` (${item.productDescription})`
                                            : ""}
                                    </Typography>
                                    <Typography>{formatCurrency(item.totalAmount, order.currency)}</Typography>
                                </Stack>
                            ))}
                            <Divider />
                            <Typography variant="h6" textAlign="right" color="secondary.main">
                                Total: {formatCurrency(order.totalAmount, order.currency)}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
}
