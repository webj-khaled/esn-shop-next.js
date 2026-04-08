"use client";

import { CartContext } from "./cart-context";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Link,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import checkout from "../checkout/actions/checkout";
import confirmCheckout from "../checkout/actions/confirm-checkout";
import { formatEuro } from "../common/util/currency";

interface DeliveryAddress {
    fullName: string;
    phone: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

const EMPTY_ADDRESS: DeliveryAddress = {
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
};

const isAddressComplete = (address: DeliveryAddress) =>
    !!address.fullName.trim() &&
    !!address.line1.trim() &&
    !!address.city.trim() &&
    !!address.state.trim() &&
    !!address.postalCode.trim() &&
    !!address.country.trim();

export default function CartPage() {
    const { items, totalPrice, updateQuantity, removeItem, clearCart } = useContext(CartContext);
    const searchParams = useSearchParams();

    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState<{ type: "error" | "success" | "warning"; text: string } | null>(null);
    const [syncWarning, setSyncWarning] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>(EMPTY_ADDRESS);
    const handledCheckoutKeysRef = useRef(new Set<string>());
    const confirmedSessionsRef = useRef(new Set<string>());
    const isMountedRef = useRef(true);

    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );
    const addressReady = isAddressComplete(deliveryAddress);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        const checkoutStatus = searchParams.get("checkout");
        const sessionId = searchParams.get("session_id");
        const checkoutKey = `${checkoutStatus ?? ""}:${sessionId ?? ""}`;
        const hasHandledCheckoutKey = handledCheckoutKeysRef.current.has(checkoutKey);

        if (checkoutStatus === "cancelled") {
            if (!hasHandledCheckoutKey) {
                setStatusMessage({
                    type: "warning",
                    text: "Checkout was cancelled. Your cart items are still here.",
                });
                handledCheckoutKeysRef.current.add(checkoutKey);
            }
            return;
        }

        if (checkoutStatus !== "success") {
            return;
        }

        if (!hasHandledCheckoutKey) {
            clearCart();
            setSyncWarning("");
            setStatusMessage({
                type: "success",
                text: "Payment successful. Your package will be delivered within 14 days.",
            });
            handledCheckoutKeysRef.current.add(checkoutKey);
        }

        if (!sessionId || confirmedSessionsRef.current.has(sessionId)) {
            return;
        }

        confirmedSessionsRef.current.add(sessionId);
        setIsConfirming(true);

        (async () => {
            try {
                const confirmation = await confirmCheckout({ sessionId });
                if (!isMountedRef.current) {
                    return;
                }

                if (confirmation.error) {
                    setSyncWarning("Payment succeeded, but order sync is still pending. Please contact support.");
                    return;
                }
            } catch {
                if (!isMountedRef.current) {
                    return;
                }
                setSyncWarning("Payment succeeded, but order sync is still pending. Please contact support.");
            } finally {
                if (isMountedRef.current) {
                    setIsConfirming(false);
                }
            }
        })();
    }, [clearCart, searchParams]);

    const onCheckout = async () => {
        if (!items.length) {
            return;
        }
        if (!addressReady) {
            setError("Please fill in all required delivery address fields.");
            return;
        }

        setError("");
        setStatusMessage(null);
        setIsLoading(true);

        try {
            const result = await checkout({
                items: items.map((item) => ({
                    productId: item.productId,
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                })),
                deliveryAddress: {
                    fullName: deliveryAddress.fullName.trim(),
                    phone: deliveryAddress.phone.trim() || undefined,
                    line1: deliveryAddress.line1.trim(),
                    line2: deliveryAddress.line2.trim() || undefined,
                    city: deliveryAddress.city.trim(),
                    state: deliveryAddress.state.trim(),
                    postalCode: deliveryAddress.postalCode.trim(),
                    country: deliveryAddress.country.trim(),
                },
            });
            if (result.error) {
                setError(result.error);
                return;
            }

            const redirectUrl = (result.data as { url?: string } | undefined)?.url;
            if (!redirectUrl) {
                setError("Checkout session URL is missing.");
                return;
            }

            window.location.href = redirectUrl;
        } catch {
            setError("Unable to start checkout. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack spacing={3} marginY={2} className="esn-fade-up">
            <Stack spacing={1}>
                <Chip label="Checkout" color="info" sx={{ width: "fit-content" }} />
                <Typography variant="h3">Cart</Typography>
            </Stack>
            {!items.length && <Typography>Your cart is empty.</Typography>}

            {statusMessage && <Alert severity={statusMessage.type}>{statusMessage.text}</Alert>}
            {syncWarning && <Alert severity="warning">{syncWarning}</Alert>}
            {isConfirming && <Alert severity="info">Finalizing your order...</Alert>}

            {items.map((item) => (
                <Card key={`${item.productId}-${item.color}-${item.size}`} sx={{ overflow: "hidden" }}>
                    <CardContent>
                        <Stack direction={{ md: "row", xs: "column" }} spacing={2} alignItems={{ md: "center", xs: "stretch" }}>
                            <Box flex={1}>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2">
                                    Color: {item.color} | Size: {item.size}
                                </Typography>
                                <Typography variant="body2">
                                    {formatEuro(item.unitPrice)} each
                                </Typography>
                            </Box>
                            <TextField
                                select
                                size="small"
                                label="Quantity"
                                value={item.quantity}
                                onChange={(event) =>
                                    updateQuantity(
                                        item.productId,
                                        item.color,
                                        item.size,
                                        Number(event.target.value)
                                    )
                                }
                                sx={{ minWidth: 120 }}
                            >
                                {Array.from({ length: item.maxQuantity }, (_, i) => i + 1).map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Typography minWidth={100}>
                                {formatEuro(item.quantity * item.unitPrice)}
                            </Typography>
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={() =>
                                    removeItem(
                                        item.productId,
                                        item.color,
                                        item.size
                                    )
                                }
                            >
                                Remove
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            ))}

            {!!items.length && (
                <Card sx={{ overflow: "hidden" }}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h5">Delivery Address</Typography>
                            <TextField
                                label="Full Name"
                                value={deliveryAddress.fullName}
                                onChange={(event) =>
                                    setDeliveryAddress((current) => ({ ...current, fullName: event.target.value }))
                                }
                                required
                            />
                            <TextField
                                label="Phone Number (Optional)"
                                value={deliveryAddress.phone}
                                onChange={(event) =>
                                    setDeliveryAddress((current) => ({ ...current, phone: event.target.value }))
                                }
                                type="tel"
                            />
                            <TextField
                                label="Address Line 1"
                                value={deliveryAddress.line1}
                                onChange={(event) =>
                                    setDeliveryAddress((current) => ({ ...current, line1: event.target.value }))
                                }
                                required
                            />
                            <TextField
                                label="Address Line 2 (Optional)"
                                value={deliveryAddress.line2}
                                onChange={(event) =>
                                    setDeliveryAddress((current) => ({ ...current, line2: event.target.value }))
                                }
                            />
                            <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
                                <TextField
                                    label="City"
                                    value={deliveryAddress.city}
                                    onChange={(event) =>
                                        setDeliveryAddress((current) => ({ ...current, city: event.target.value }))
                                    }
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="State"
                                    value={deliveryAddress.state}
                                    onChange={(event) =>
                                        setDeliveryAddress((current) => ({ ...current, state: event.target.value }))
                                    }
                                    required
                                    fullWidth
                                />
                            </Stack>
                            <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
                                <TextField
                                    label="Postal Code"
                                    value={deliveryAddress.postalCode}
                                    onChange={(event) =>
                                        setDeliveryAddress((current) => ({ ...current, postalCode: event.target.value }))
                                    }
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Country"
                                    value={deliveryAddress.country}
                                    onChange={(event) =>
                                        setDeliveryAddress((current) => ({ ...current, country: event.target.value }))
                                    }
                                    required
                                    fullWidth
                                />
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            {!!items.length && (
                <Card>
                    <CardContent>
                        <Stack spacing={1.2} alignItems={{ xs: "stretch", md: "flex-end" }}>
                            <Typography variant="h6">Items: {totalCount}</Typography>
                            <Typography variant="h5" color="secondary.main">
                                Total: {formatEuro(totalPrice)}
                            </Typography>
                            <Typography variant="body2" textAlign={{ xs: "left", md: "right" }} color="text.secondary">
                                By checking out, you agree to our{" "}
                                <Link component={NextLink} href="/privacy-notice" underline="hover">
                                    Privacy Notice
                                </Link>{" "}
                                and{" "}
                                <Link component={NextLink} href="/impressum" underline="hover">
                                    Impressum
                                </Link>
                                .
                            </Typography>
                            {error && <Typography color="error">{error}</Typography>}
                            <Button
                                variant="contained"
                                onClick={onCheckout}
                                disabled={isLoading || isConfirming || !addressReady}
                            >
                                Checkout
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            )}
        </Stack>
    );
}
