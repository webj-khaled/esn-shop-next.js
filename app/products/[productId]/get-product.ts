export default async function getProduct(productId: number) {
    const { productsCatalog } = await import("../catalog");
    return productsCatalog.find((product) => product.id === productId);
}
