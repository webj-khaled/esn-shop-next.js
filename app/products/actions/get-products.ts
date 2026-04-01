export default async function getProducts() {
    const { productsCatalog } = await import("../catalog");
    return productsCatalog;
}
