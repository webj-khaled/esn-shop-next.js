"use client";

import { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import Checkout from "@/app/checkout/checkout";
import { formatEuro } from "@/app/common/util/currency";
import { Product, ShirtColor } from "../interfaces/product.interface";

interface ProductShowcaseProps {
    product: Product;
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
    const [selectedColor, setSelectedColor] = useState<ShirtColor>(product.colors[0]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handleColorChange = (color: ShirtColor) => {
        setSelectedColor(color);
        setActiveImageIndex(0);
    };

    const currentImages = useMemo(() => {
        return product.imagesByColor[selectedColor] ?? [];
    }, [product.imagesByColor, selectedColor]);

    const activeImage = currentImages[activeImageIndex] ?? currentImages[0] ?? "";

    return (
        <Grid container spacing={3} marginBottom="2rem" className="esn-fade-up">
            <Grid size={{ md: 7, xs: 12 }}>
                <Card>
                    <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                        <Stack gap={2.5}>
                            <Chip label="ESN Salzburg Merchandise" color="secondary" sx={{ width: "fit-content" }} />
                            <Typography variant="h2">{product.name}</Typography>
                            <Typography color="text.secondary">{product.description}</Typography>
                            <Typography variant="h4" color="secondary.main">
                                {formatEuro(product.price)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Color: {selectedColor.toUpperCase()} | Sizes: {product.sizes.join(" / ")}
                            </Typography>

                            <Stack direction="row" spacing={1}>
                                {product.colors.map((color) => (
                                    <Chip
                                        key={color}
                                        label={color.toUpperCase()}
                                        color={selectedColor === color ? "primary" : "default"}
                                        variant={selectedColor === color ? "filled" : "outlined"}
                                        onClick={() => handleColorChange(color)}
                                    />
                                ))}
                            </Stack>

                            {!!activeImage && (
                                <Box
                                    sx={{
                                        width: "100%",
                                        aspectRatio: "4 / 5",
                                        overflow: "hidden",
                                        borderRadius: 3,
                                        border: "1px solid rgba(46,49,146,0.16)",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={activeImage}
                                        alt={`${product.name} in ${selectedColor}`}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </Box>
                            )}

                            <Grid container spacing={1.25}>
                                {currentImages.map((image, index) => (
                                    <Grid key={image} size={{ xs: 4 }}>
                                        <Box
                                            component="button"
                                            type="button"
                                            aria-label={`Show ${selectedColor} image ${index + 1}`}
                                            onClick={() => setActiveImageIndex(index)}
                                            sx={{
                                                p: 0,
                                                width: "100%",
                                                aspectRatio: "1 / 1",
                                                borderRadius: 2,
                                                overflow: "hidden",
                                                border: activeImageIndex === index
                                                    ? "2px solid rgba(46,49,146,0.9)"
                                                    : "1px solid rgba(46,49,146,0.18)",
                                                cursor: "pointer",
                                                background: "transparent",
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={image}
                                                alt={`${product.name} ${selectedColor} thumbnail ${index + 1}`}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ md: 5, xs: 12 }}>
                <Card>
                    <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                        <Stack spacing={2.5}>
                            <Typography variant="h5">Choose your fit</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Select color, size, and quantity then add to cart.
                            </Typography>
                            <Checkout
                                product={product}
                                selectedColor={selectedColor}
                                onColorChange={handleColorChange}
                            />
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
