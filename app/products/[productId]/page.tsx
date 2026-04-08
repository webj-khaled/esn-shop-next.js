import getProduct from "./get-product";
import { notFound } from "next/navigation";
import ProductShowcase from "./product-showcase";

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

    return <ProductShowcase product={product} />;
}
