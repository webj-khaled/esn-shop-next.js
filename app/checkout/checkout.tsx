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
    selectedColor?: ShirtColor;
    onColorChange?: (color: ShirtColor) => void;
}

export default function Checkout({ product, selectedColor, onColorChange }: CheckoutProps) {
    const { addItem, totalItems } = useContext(CartContext);
    const router = useRouter();
    const [internalColor, setInternalColor] = useState<ShirtColor>(product.colors[0]);
    const [size, setSize] = useState<ShirtSize>(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const hasMultipleColors = product.colors.length > 1;
    const color = selectedColor ?? internalColor;

    const maxQuantity = useMemo(() => {
        return product.stockByColorAndSize[color][size];
    }, [color, size, product]);

    const isOutOfStock = maxQuantity < 1;
    const clampedQuantity = Math.max(1, Math.min(quantity, maxQuantity || 1));

    const handleColorUpdate = (nextColor: ShirtColor) => {
        if (selectedColor !== undefined) {
            onColorChange?.(nextColor);
            return;
        }
        setInternalColor(nextColor);
    };

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
            quantity: clampedQuantity,
            unitPrice: product.price,
            maxQuantity,
        });
        setFeedbackOpen(true);
    };

    return (
        <Stack spacing={2} maxWidth={360}>
            {hasMultipleColors && (
                <TextField
                    select
                    label="Color"
                    value={color}
                    onChange={(event) => {
                        const nextColor = event.target.value as ShirtColor;
                        handleColorUpdate(nextColor);
                        const nextMax = product.stockByColorAndSize[nextColor][size];
                        setQuantity((current) => Math.max(1, Math.min(current, nextMax || 1)));
                    }}
                >
                    {product.colors.map((currentColor) => (
                        <MenuItem key={currentColor} value={currentColor}>
                            {currentColor.toUpperCase()}
                        </MenuItem>
                    ))}
                </TextField>
            )}

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
                value={clampedQuantity}
                onChange={(event) => handleQuantityChange(Number(event.target.value))}
                inputProps={{ min: 1, max: maxQuantity || 1 }}
                disabled={isOutOfStock}
            />

            {isOutOfStock && (
                <Typography variant="body2">
                    {hasMultipleColors
                        ? "Out of stock for this color/size."
                        : "Out of stock for this size."}
                </Typography>
            )}

            <Button variant="contained" color="secondary" onClick={handleAddToCart} disabled={isOutOfStock}>
                Add To Cart
            </Button>
            <Button variant="outlined" onClick={() => router.push("/cart")}>
                Go To Cart
            </Button>
            {totalItems > 0 && (
                <Typography variant="body2" color="success.main" fontWeight={700}>
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
                    {clampedQuantity} x {product.name} ({color}/{size}) added successfully.
                </Alert>
            </Snackbar>
        </Stack>
    );
}
