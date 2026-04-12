"use client";

import { PointerEvent as ReactPointerEvent, useContext, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import {
    Alert,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    GlobalStyles,
    IconButton,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
import { useRouter } from "next/navigation";
import Checkout from "@/app/checkout/checkout";
import { CartContext } from "@/app/cart/cart-context";
import { formatEuro } from "@/app/common/util/currency";
import { Product, ShirtColor, ShirtSize } from "../interfaces/product.interface";

interface ProductShowcaseProps {
    product: Product;
}

const mobileSurfaceBackground =
    "#ffffff";
const mobileFooterHeightPx = 86;

export default function ProductShowcase({ product }: ProductShowcaseProps) {
    const router = useRouter();
    const { addItem, totalItems } = useContext(CartContext);

    const [selectedColor, setSelectedColor] = useState<ShirtColor>(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState<ShirtSize | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [sizeDialogOpen, setSizeDialogOpen] = useState(false);
    const [addAfterSizeSelection, setAddAfterSizeSelection] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
    const swipeStartXRef = useRef<number | null>(null);
    const swipeStartYRef = useRef<number | null>(null);

    const hasMultipleColors = product.colors.length > 1;
    const currentImages = useMemo(
        () => product.imagesByColor[selectedColor] ?? [],
        [product.imagesByColor, selectedColor]
    );
    const safeActiveImageIndex =
        currentImages.length > 0 ? Math.min(activeImageIndex, currentImages.length - 1) : 0;
    const activeImage = currentImages[safeActiveImageIndex] ?? "";
    const hasAnyStockForColor = product.sizes.some(
        (size) => product.stockByColorAndSize[selectedColor][size] > 0
    );
    const isSizeSelected = selectedSize !== null;
    const maxQuantity = isSizeSelected
        ? product.stockByColorAndSize[selectedColor][selectedSize]
        : 0;
    const isSelectedSizeOutOfStock = isSizeSelected && maxQuantity < 1;
    const isAddDisabled = !hasAnyStockForColor || (isSizeSelected && isSelectedSizeOutOfStock);

    const handleColorChange = (color: ShirtColor) => {
        setSelectedColor(color);
        setActiveImageIndex(0);

        if (selectedSize && product.stockByColorAndSize[color][selectedSize] < 1) {
            setSelectedSize(null);
        }
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
            return;
        }
        router.push("/products");
    };

    const goToPreviousImage = () => {
        if (currentImages.length <= 1) {
            return;
        }
        setActiveImageIndex((current) =>
            current === 0 ? currentImages.length - 1 : current - 1
        );
    };

    const goToNextImage = () => {
        if (currentImages.length <= 1) {
            return;
        }
        setActiveImageIndex((current) => (current + 1) % currentImages.length);
    };

    const openPhotoViewer = (startIndex?: number) => {
        if (!currentImages.length) {
            return;
        }
        if (typeof startIndex === "number") {
            setActiveImageIndex(startIndex);
        }
        setPhotoViewerOpen(true);
    };

    const resetSwipeTracking = () => {
        swipeStartXRef.current = null;
        swipeStartYRef.current = null;
    };

    const handleViewerPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }
        swipeStartXRef.current = event.clientX;
        swipeStartYRef.current = event.clientY;
    };

    const handleViewerPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (swipeStartXRef.current === null || currentImages.length <= 1) {
            resetSwipeTracking();
            return;
        }

        const deltaX = event.clientX - swipeStartXRef.current;
        const deltaY = event.clientY - (swipeStartYRef.current ?? event.clientY);
        const horizontalSwipe = Math.abs(deltaX) >= 42 && Math.abs(deltaX) > Math.abs(deltaY) + 10;

        if (horizontalSwipe) {
            if (deltaX > 0) {
                goToPreviousImage();
            } else {
                goToNextImage();
            }
        }

        resetSwipeTracking();
    };

    const addVariantToCart = (size: ShirtSize) => {
        const stock = product.stockByColorAndSize[selectedColor][size];
        if (stock < 1) {
            return;
        }
        addItem({
            productId: product.id,
            name: product.name,
            color: selectedColor,
            size,
            quantity: 1,
            unitPrice: product.price,
            maxQuantity: stock,
        });
        setFeedbackOpen(true);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setAddAfterSizeSelection(true);
            setSizeDialogOpen(true);
            return;
        }

        addVariantToCart(selectedSize);
        setAddAfterSizeSelection(false);
    };

    const closeSizeDialog = () => {
        setSizeDialogOpen(false);
        setAddAfterSizeSelection(false);
    };

    return (
        <>
            <GlobalStyles
                styles={{
                    "@media (max-width:1199.95px)": {
                        "[data-main-header='true']": {
                            display: "none !important",
                        },
                    },
                }}
            />

            <Box
                sx={{
                    display: { xs: "block", lg: "none" },
                    position: "relative",
                    width: "100vw",
                    left: "50%",
                    right: "50%",
                    ml: "-50vw",
                    mr: "-50vw",
                    mt: { xs: -3, md: -5 },
                    minHeight: "100svh",
                    background: "#f3f6fc",
                    pb: `calc(${mobileFooterHeightPx}px + env(safe-area-inset-bottom, 0px))`,
                }}
            >
                <Box
                    sx={{
                        position: "fixed",
                        inset: "0 0 auto 0",
                        height: "80svh",
                        minHeight: { xs: 360, sm: 430, md: 520 },
                        maxHeight: { xs: 620, sm: 720, md: 820 },
                        zIndex: 1,
                        overflow: "hidden",
                        backgroundColor: "#0d1438",
                    }}
                >
                    {activeImage ? (
                        <Box
                            component="img"
                            src={activeImage}
                            alt={`${product.name} in ${selectedColor}`}
                            onClick={() => openPhotoViewer(safeActiveImageIndex)}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                cursor: "zoom-in",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                color: "rgba(255,255,255,0.78)",
                            }}
                        >
                            <Typography>Image unavailable</Typography>
                        </Box>
                    )}

                    {currentImages.length > 1 && (
                        <Stack
                            direction="row"
                            spacing={0.8}
                            sx={{
                                position: "absolute",
                                bottom: 14,
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            {currentImages.map((image, index) => (
                                <Box
                                    key={image}
                                    sx={{
                                        width: index === safeActiveImageIndex ? 18 : 7,
                                        height: 7,
                                        borderRadius: 99,
                                        bgcolor:
                                            index === safeActiveImageIndex
                                                ? "white"
                                                : "rgba(255,255,255,0.58)",
                                        transition: "all 200ms ease",
                                    }}
                                />
                            ))}
                        </Stack>
                    )}
                </Box>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        position: "fixed",
                        top: 14,
                        left: 0,
                        right: 0,
                        zIndex: 25,
                        px: { xs: 2, sm: 2.5, md: 3.5 },
                        pointerEvents: "none",
                    }}
                >
                    <IconButton
                        aria-label="Go back"
                        onClick={handleBack}
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.38)",
                            backdropFilter: "blur(6px)",
                            pointerEvents: "auto",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                        }}
                    >
                        <ArrowBackRounded />
                    </IconButton>

                    <IconButton
                        aria-label="Open cart"
                        onClick={() => router.push("/cart")}
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.38)",
                            backdropFilter: "blur(6px)",
                            pointerEvents: "auto",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                        }}
                    >
                        <Badge
                            badgeContent={totalItems}
                            color="secondary"
                            max={99}
                            sx={{
                                "& .MuiBadge-badge": {
                                    right: -6,
                                    top: 8,
                                    border: "1px solid rgba(0,0,0,0.22)",
                                },
                            }}
                        >
                            <ShoppingCartRounded />
                        </Badge>
                    </IconButton>
                </Stack>

                <Box
                    sx={{
                        position: "sticky",
                        zIndex: 2,
                        mt: "77svh",
                        top: 0,
                        minHeight: `calc(100svh - ${mobileFooterHeightPx}px - env(safe-area-inset-bottom, 0px))`,
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                        background: mobileSurfaceBackground,
                        boxShadow: "0 -16px 34px rgba(10, 16, 47, 0.22)",
                        px: { xs: 1.6, sm: 2.2, md: 3 },
                        py: { xs: 1.25, md: 1.8 },
                    }}
                >
                    <Stack spacing={1.1}>
                        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1.2}>
                            <Typography
                                sx={{
                                    fontSize: { xs: "1.08rem", sm: "1.2rem", md: "1.35rem" },
                                    lineHeight: 1.2,
                                    fontWeight: 700,
                                    flex: 1,
                                }}
                            >
                                {product.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                                    fontWeight: 800,
                                    color: "secondary.main",
                                    lineHeight: 1.2,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {formatEuro(product.price)}
                            </Typography>
                        </Stack>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.38,
                                fontSize: { xs: "0.84rem", sm: "0.9rem", md: "0.95rem" },
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {product.description}
                        </Typography>

                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => {
                                setAddAfterSizeSelection(false);
                                setSizeDialogOpen(true);
                            }}
                            endIcon={<KeyboardArrowDownRounded />}
                            sx={{
                                alignSelf: "flex-start",
                                borderRadius: 999,
                                px: 1.7,
                                py: 0.55,
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: "0.84rem", sm: "0.9rem" },
                                borderColor: "rgba(44,56,96,0.28)",
                                color: selectedSize ? "primary.dark" : "text.secondary",
                                bgcolor: "rgba(255,255,255,0.72)",
                            }}
                        >
                            {selectedSize ? `Size: ${selectedSize}` : "Select size"}
                        </Button>

                        {hasMultipleColors && (
                            <Stack direction="row" spacing={0.7} useFlexGap flexWrap="wrap">
                                {product.colors.map((color) => (
                                    <Button
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        variant={selectedColor === color ? "contained" : "outlined"}
                                        color={selectedColor === color ? "primary" : "inherit"}
                                        sx={{
                                            borderRadius: 999,
                                            px: 1.35,
                                            py: 0.48,
                                            minWidth: 0,
                                            textTransform: "uppercase",
                                            fontSize: "0.72rem",
                                            fontWeight: 700,
                                            borderColor: "rgba(46,49,146,0.22)",
                                        }}
                                    >
                                        {color}
                                    </Button>
                                ))}
                            </Stack>
                        )}

                        {currentImages.length > 1 && (
                            <Stack direction="row" spacing={0.7} sx={{ overflowX: "auto", pb: 0.2 }}>
                                {currentImages.map((image, index) => (
                                    <Box
                                        key={image}
                                        component="button"
                                        type="button"
                                        onClick={() => {
                                            setActiveImageIndex(index);
                                            openPhotoViewer(index);
                                        }}
                                        aria-label={`Show image ${index + 1}`}
                                        sx={{
                                            p: 0,
                                            width: 58,
                                            height: 58,
                                            flexShrink: 0,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            border:
                                                index === safeActiveImageIndex
                                                    ? "2px solid rgba(46,49,146,0.92)"
                                                    : "1px solid rgba(46,49,146,0.22)",
                                            cursor: "pointer",
                                            background: "transparent",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={image}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        )}

                        {!hasAnyStockForColor && (
                            <Alert severity="warning">No stock left for this color.</Alert>
                        )}

                        {isSizeSelected && isSelectedSizeOutOfStock && hasAnyStockForColor && (
                            <Alert severity="warning">Selected size is out of stock.</Alert>
                        )}
                    </Stack>
                </Box>

                <Box
                    sx={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 24,
                        pt: 1.1,
                        pb: "calc(10px + env(safe-area-inset-bottom, 0px))",
                        background: "#ffffff",
                        borderTop: "1px solid rgba(20,26,74,0.1)",
                        boxShadow: "0 -8px 20px rgba(20,26,74,0.08)",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            maxWidth: 880,
                            mx: "auto",
                            px: { xs: 2, sm: 3, md: 4 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => router.push("/cart")}
                            sx={{
                                minWidth: 92,
                                borderRadius: 2.5,
                                textTransform: "none",
                                fontWeight: 700,
                                fontSize: { xs: "0.82rem", sm: "0.9rem" },
                            }}
                        >
                            View Cart
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleAddToCart}
                            disabled={isAddDisabled}
                            sx={{
                                flex: 1,
                                borderRadius: 2.5,
                                py: 1.02,
                                textTransform: "none",
                                fontWeight: 800,
                                fontSize: { xs: "0.9rem", sm: "0.98rem" },
                            }}
                        >
                            Add To Cart
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <Dialog
                open={sizeDialogOpen}
                onClose={closeSizeDialog}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Select Size</DialogTitle>
                <DialogContent>
                    <Stack spacing={1} sx={{ pt: 0.5 }}>
                        {product.sizes.map((size) => {
                            const stock = product.stockByColorAndSize[selectedColor][size];
                            const outOfStock = stock < 1;
                            const selected = size === selectedSize;

                            return (
                                <Button
                                    key={size}
                                    variant={selected ? "contained" : "outlined"}
                                    color={selected ? "primary" : "inherit"}
                                    onClick={() => {
                                        if (outOfStock) {
                                            return;
                                        }

                                        const shouldAutoAdd = addAfterSizeSelection;
                                        setSelectedSize(size);
                                        closeSizeDialog();

                                        if (shouldAutoAdd) {
                                            addVariantToCart(size);
                                        }
                                    }}
                                    disabled={outOfStock}
                                    sx={{
                                        justifyContent: "space-between",
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1.1,
                                        textTransform: "none",
                                    }}
                                >
                                    <Typography fontWeight={700}>{size}</Typography>
                                    <Typography variant="body2">
                                        {outOfStock ? "Out of stock" : `${stock} available`}
                                    </Typography>
                                </Button>
                            );
                        })}
                    </Stack>
                </DialogContent>
            </Dialog>

            <Dialog
                open={photoViewerOpen}
                onClose={() => setPhotoViewerOpen(false)}
                fullScreen
                PaperProps={{
                    sx: {
                        bgcolor: "#090d22",
                    },
                }}
            >
                <Box
                    onPointerDown={handleViewerPointerDown}
                    onPointerUp={handleViewerPointerUp}
                    onPointerCancel={resetSwipeTracking}
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        touchAction: "pan-y",
                        userSelect: "none",
                        background:
                            "radial-gradient(circle at center, rgba(33,42,93,0.56) 0%, rgba(9,13,34,1) 68%)",
                    }}
                >
                    <IconButton
                        aria-label="Close photo viewer"
                        onClick={() => setPhotoViewerOpen(false)}
                        sx={{
                            position: "absolute",
                            top: 14,
                            right: 14,
                            zIndex: 2,
                            color: "white",
                            bgcolor: "rgba(0,0,0,0.36)",
                            width: 42,
                            height: 42,
                            "&:hover": { bgcolor: "rgba(0,0,0,0.54)" },
                        }}
                    >
                        <CloseRounded />
                    </IconButton>

                    {activeImage ? (
                        <Box
                            component="img"
                            src={activeImage}
                            alt={`${product.name} fullscreen ${safeActiveImageIndex + 1}`}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block",
                            }}
                        />
                    ) : (
                        <Typography color="rgba(255,255,255,0.8)">Image unavailable</Typography>
                    )}

                    {currentImages.length > 1 && (
                        <Stack
                            direction="row"
                            spacing={0.8}
                            sx={{
                                position: "absolute",
                                bottom: 22,
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            {currentImages.map((image, index) => (
                                <Box
                                    key={`${image}-viewer`}
                                    sx={{
                                        width: index === safeActiveImageIndex ? 18 : 8,
                                        height: 8,
                                        borderRadius: 99,
                                        bgcolor:
                                            index === safeActiveImageIndex
                                                ? "white"
                                                : "rgba(255,255,255,0.55)",
                                        transition: "all 200ms ease",
                                    }}
                                />
                            ))}
                        </Stack>
                    )}
                </Box>
            </Dialog>

            <Snackbar
                open={feedbackOpen}
                autoHideDuration={3000}
                onClose={() => setFeedbackOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
                    Added to cart: {product.name} ({selectedColor}/{selectedSize ?? "size"})
                </Alert>
            </Snackbar>

            <Grid
                container
                spacing={3}
                marginBottom="2rem"
                className="esn-fade-up"
                sx={{ display: { xs: "none", lg: "flex" } }}
            >
                <Grid size={{ lg: 7, xs: 12 }}>
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
                                    {hasMultipleColors
                                        ? `Color: ${selectedColor.toUpperCase()} | Sizes: ${product.sizes.join(" / ")}`
                                        : `Sizes: ${product.sizes.join(" / ")}`}
                                </Typography>

                                {hasMultipleColors && (
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
                                )}

                                {!!activeImage && (
                                    <Box
                                        sx={{
                                            width: "100%",
                                            aspectRatio: "4 / 5",
                                            overflow: "hidden",
                                            borderRadius: 3,
                                            border: "1px solid rgba(46,49,146,0.16)",
                                            backgroundColor: "#0d1438",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={activeImage}
                                            alt={`${product.name} in ${selectedColor}`}
                                            onClick={() => openPhotoViewer(safeActiveImageIndex)}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                display: "block",
                                                cursor: "zoom-in",
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
                                                onClick={() => {
                                                    setActiveImageIndex(index);
                                                    openPhotoViewer(index);
                                                }}
                                                sx={{
                                                    p: 0,
                                                    width: "100%",
                                                    aspectRatio: "1 / 1",
                                                    borderRadius: 2,
                                                    overflow: "hidden",
                                                    border:
                                                        safeActiveImageIndex === index
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

                <Grid
                    size={{ lg: 5, xs: 12 }}
                    sx={{
                        position: { lg: "sticky" },
                        top: { lg: 112 },
                        alignSelf: "flex-start",
                        height: "fit-content",
                    }}
                >
                    <Card>
                        <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                            <Stack spacing={2.5}>
                                <Typography variant="h4" color="secondary.main">
                                    {formatEuro(product.price)}
                                </Typography>
                                <Typography variant="h5">Choose your fit</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {hasMultipleColors
                                        ? "Select color, size, and quantity then add to cart."
                                        : "Select size and quantity then add to cart."}
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
        </>
    );
}
