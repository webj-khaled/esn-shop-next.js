"use client";

import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Product as IProduct } from "./interfaces/product.interface";
import { useRouter } from "next/navigation";
import { formatEuro } from "../common/util/currency";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  const swatchByColor: Record<string, string> = {
    black: "#1B1B1F",
    white: "#FBFBFF",
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea
        onClick={() => router.push(`/products/${product.id}`)}
        sx={{
          height: "100%",
          p: 2.4,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
        }}
      >
        <Stack gap={2.2} sx={{ width: "100%" }}>
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
                Colors:
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
            sx={{
              alignSelf: "flex-start",
              px: 2,
              py: 1,
              borderRadius: 999,
              fontWeight: 700,
              color: "white",
              bgcolor: "primary.main",
            }}
          >
            View Product
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
