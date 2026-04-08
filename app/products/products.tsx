import { Chip, Stack, Typography } from "@mui/material";
import getProducts from "./actions/get-products";
import ProductsGrid from "./products-grid";

export default async function Products() {
    const products = await getProducts();

    return (
        <Stack spacing={2.5}>
            <Stack spacing={1}>
                <Chip
                    label="Classic Shirt Collection"
                    color="secondary"
                    sx={{ width: "fit-content" }}
                />
                <Typography variant="h3">Shop Collection</Typography>
                <Typography variant="body1" color="text.secondary">
                    Every purchase supports the Erasmus Student Network spirit in Salzburg.
                </Typography>
            </Stack>

            <ProductsGrid products={products} />
        </Stack>
    );
}
