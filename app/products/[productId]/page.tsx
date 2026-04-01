import { Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Grid from "@mui/material/Grid";
import Checkout from "@/app/checkout/checkout";
import { notFound } from "next/navigation";

type SingleProductProps = {
    params: Promise<{
        productId: string;
    }>;
};

export default async function SingleProduct({ params }: SingleProductProps) {
    const resolvedParams = params instanceof Promise ? await params : params;
    const product = await getProduct(+resolvedParams.productId);
    if (!product) {
        notFound();
    }

    return (
        <Grid container marginBottom={"2rem"} rowGap={3}>
            <Grid size={{ md: 8, xs: 12 }}>
                <Stack gap={3}>
                    <Typography variant="h2">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography variant="h4">${product.price}</Typography>
                    <Checkout product={product} />
                </Stack>
            </Grid>
        </Grid>
    );
}
