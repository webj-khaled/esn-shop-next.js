"use client";

import {
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import { KeyboardEvent, MouseEvent, PointerEvent, useMemo, useRef, useState } from "react";
import { Product as IProduct } from "./interfaces/product.interface";
import { useRouter } from "next/navigation";
import { formatEuro } from "../common/util/currency";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  const primaryColor = product.colors[0];
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const gestureStartXRef = useRef<number | null>(null);
  const gestureStartYRef = useRef<number | null>(null);
  const didSwipeRef = useRef(false);
  const swatchByColor: Record<string, string> = {
    black: "#1B1B1F",
    white: "#FBFBFF",
  };

  const previewImages = useMemo(() => {
    const images = product.imagesByColor[primaryColor] ?? [];
    return images.slice(0, 2);
  }, [product.imagesByColor, primaryColor]);

  const safeActivePreviewIndex =
    previewImages.length > 0
      ? Math.min(activePreviewIndex, previewImages.length - 1)
      : 0;

  const goToNextPreview = () => {
    if (previewImages.length <= 1) {
      return;
    }
    setActivePreviewIndex((current) => (current + 1) % previewImages.length);
  };

  const goToPreviousPreview = () => {
    if (previewImages.length <= 1) {
      return;
    }
    setActivePreviewIndex((current) =>
      current === 0 ? previewImages.length - 1 : current - 1
    );
  };

  const openProductPage = () => {
    router.push(`/products/${product.id}`, { scroll: true });
  };

  const handleCardClick = () => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }
    openProductPage();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProductPage();
    }
  };

  const startGesture = (startX: number, startY: number) => {
    didSwipeRef.current = false;
    gestureStartXRef.current = startX;
    gestureStartYRef.current = startY;
  };

  const finishGesture = (endX: number, endY: number) => {
    if (previewImages.length <= 1 || gestureStartXRef.current === null) {
      return;
    }

    const deltaX = endX - gestureStartXRef.current;
    const deltaY =
      typeof gestureStartYRef.current === "number"
        ? endY - gestureStartYRef.current
        : 0;
    const swipeThreshold = 30;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY) + 8;

    if (isHorizontalSwipe) {
      didSwipeRef.current = true;
      if (deltaX > 0) {
        goToPreviousPreview();
      } else {
        goToNextPreview();
      }
    }

    gestureStartXRef.current = null;
    gestureStartYRef.current = null;
  };

  const handlePreviewPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    startGesture(event.clientX, event.clientY);
  };

  const handlePreviewPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    finishGesture(event.clientX, event.clientY);
  };

  const handlePreviewPointerCancel = () => {
    didSwipeRef.current = false;
    gestureStartXRef.current = null;
    gestureStartYRef.current = null;
  };

  const handlePreviewClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }

    openProductPage();
  };

  return (
    <Card
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      sx={{
        height: "100%",
        border: "1px solid rgba(46,49,146,0.24)",
        boxShadow: "0 20px 40px rgba(20, 26, 74, 0.14)",
        background:
          "linear-gradient(162deg, rgba(255,255,255,0.98) 0%, rgba(240,245,255,0.93) 100%)",
        cursor: "pointer",
      }}
    >
      <Stack
        gap={2.2}
        sx={{
          width: "100%",
          height: "100%",
          p: 2.4,
          alignItems: "stretch",
        }}
      >
        <Box
          onPointerDown={handlePreviewPointerDown}
          onPointerUp={handlePreviewPointerUp}
          onPointerCancel={handlePreviewPointerCancel}
          onClick={handlePreviewClick}
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 5",
            overflow: "hidden",
            borderRadius: 3,
            border: "1px solid rgba(46,49,146,0.16)",
            touchAction: "pan-y",
            userSelect: "none",
          }}
        >
          {previewImages.map((image, index) => (
            <Box
              key={`${product.id}-${image}`}
              component="img"
              src={image}
              alt={`${product.name} preview ${index + 1}`}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: index === safeActivePreviewIndex ? 1 : 0,
                transition: "opacity 260ms ease",
              }}
            />
          ))}

          {previewImages.length > 1 && (
            <>
              <IconButton
                aria-label="Previous photo"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPreviousPreview();
                }}
                sx={{
                  position: "absolute",
                  left: 4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 26,
                  height: 32,
                  borderRadius: 1.2,
                  bgcolor: "rgba(20,26,74,0.32)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(20,26,74,0.44)" },
                }}
              >
                <ChevronLeftRounded sx={{ fontSize: 20 }} />
              </IconButton>

              <IconButton
                aria-label="Next photo"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNextPreview();
                }}
                sx={{
                  position: "absolute",
                  right: 4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 26,
                  height: 32,
                  borderRadius: 1.2,
                  bgcolor: "rgba(20,26,74,0.32)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(20,26,74,0.44)" },
                }}
              >
                <ChevronRightRounded sx={{ fontSize: 20 }} />
              </IconButton>
            </>
          )}
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip label="Official ESN Drop" color="info" size="small" />
          <Typography variant="h5" color="secondary.main">
            {formatEuro(product.price)}
          </Typography>
        </Stack>

        <Typography variant="h4">{product.name}</Typography>
        <Typography color="text.secondary">{product.description}</Typography>

        <Box
          sx={{
            borderRadius: 3,
            p: 2,
            background:
              "linear-gradient(140deg, rgba(46,49,146,0.1) 0%, rgba(0,174,239,0.1) 58%, rgba(236,0,140,0.1) 100%)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              Color:
            </Typography>
            {product.colors.map((color) => (
              <Box
                key={color}
                title={color}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: "2px solid rgba(46,49,146,0.26)",
                  backgroundColor: swatchByColor[color] ?? "#E0E2EF",
                }}
              />
            ))}
          </Stack>
        </Box>

        <Typography variant="body2">
          Sizes: <strong>{product.sizes.join(" / ")}</strong>
        </Typography>

        <Divider />

        <Box
          component="button"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openProductPage();
          }}
          sx={{
            alignSelf: "flex-start",
            px: 2,
            py: 1,
            borderRadius: 999,
            fontWeight: 700,
            color: "white",
            bgcolor: "primary.main",
            border: "none",
            cursor: "pointer",
          }}
        >
          View Product
        </Box>
      </Stack>
    </Card>
  );
}
