"use client";

import Grid from "@mui/material/Grid";
import { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";

interface ProductGridProps {
    products: IProduct[];
}

export default function ProductsGrid({ products }: ProductGridProps) {
    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{ alignItems: "stretch" }}
        >
            {products?.map((product) => (
                <Grid key={product.id} size={{ sm: 6, lg: 4, xs: 12 }}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
    );
}
