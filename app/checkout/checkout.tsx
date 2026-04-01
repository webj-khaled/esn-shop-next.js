"use client";

import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { CartContext } from "../cart/cart-context";
import { Product, ShirtColor, ShirtSize } from "../products/interfaces/product.interface";
import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface CheckoutProps {
    product: Product;
}

export default function Checkout({ product }: CheckoutProps) {
    const { addItem, totalItems } = useContext(CartContext);
    const router = useRouter();
    const [color, setColor] = useState<ShirtColor>(product.colors[0]);
    const [size, setSize] = useState<ShirtSize>(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [feedbackOpen, setFeedbackOpen] = useState(false);

    const maxQuantity = useMemo(() => {
        return product.stockByColorAndSize[color][size];
    }, [color, size, product]);

    const isOutOfStock = maxQuantity < 1;

    const handleQuantityChange = (value: number) => {
        if (Number.isNaN(value)) {
            setQuantity(1);
            return;
        }
        setQuantity(Math.max(1, Math.min(value, maxQuantity || 1)));
    };

    const handleAddToCart = () => {
        if (isOutOfStock) {
            return;
        }
        addItem({
            productId: product.id,
            name: product.name,
            color,
            size,
            quantity,
            unitPrice: product.price,
            maxQuantity,
        });
        setFeedbackOpen(true);
    };

    return (
        <Stack spacing={2} maxWidth={320}>
            <TextField
                select
                label="Color"
                value={color}
                onChange={(event) => {
                    const nextColor = event.target.value as ShirtColor;
                    setColor(nextColor);
                    const nextMax = product.stockByColorAndSize[nextColor][size];
                    setQuantity((current) => Math.max(1, Math.min(current, nextMax || 1)));
                }}
            >
                {product.colors.map((currentColor) => (
                    <MenuItem key={currentColor} value={currentColor}>
                        {currentColor}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Size"
                value={size}
                onChange={(event) => {
                    const nextSize = event.target.value as ShirtSize;
                    setSize(nextSize);
                    const nextMax = product.stockByColorAndSize[color][nextSize];
                    setQuantity((current) => Math.max(1, Math.min(current, nextMax || 1)));
                }}
            >
                {product.sizes.map((currentSize) => (
                    <MenuItem key={currentSize} value={currentSize}>
                        {currentSize}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(event) => handleQuantityChange(Number(event.target.value))}
                inputProps={{ min: 1, max: maxQuantity || 1 }}
                disabled={isOutOfStock}
            />

            <Typography variant="body2">
                {isOutOfStock
                    ? "Out of stock for this color/size."
                    : `${maxQuantity} item(s) available for ${color} / ${size}.`}
            </Typography>

            <Button variant="contained" onClick={handleAddToCart} disabled={isOutOfStock}>
                Add To Cart
            </Button>
            <Button variant="outlined" onClick={() => router.push("/cart")}>
                Go To Cart
            </Button>
            {totalItems > 0 && (
                <Typography variant="body2" color="success.main">
                    {totalItems} item(s) currently in your cart.
                </Typography>
            )}

            <Snackbar
                open={feedbackOpen}
                autoHideDuration={3500}
                onClose={() => setFeedbackOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={() => setFeedbackOpen(false)}
                    action={
                        <Button color="inherit" size="small" onClick={() => router.push("/cart")}>
                            View Cart
                        </Button>
                    }
                >
                    <AlertTitle>Added to cart</AlertTitle>
                    {quantity} x {product.name} ({color}/{size}) added successfully.
                </Alert>
            </Snackbar>
        </Stack>
    );
}
