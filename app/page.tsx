import { Stack } from "@mui/material";
import ModelLookHero from "./home/model-look-hero";
import Products from "./products/products";

export default async function Home() {
  return (
    <Stack spacing={{ xs: 4, md: 6 }} className="esn-fade-up">
      <ModelLookHero />

      <Stack id="shop-selection" sx={{ scrollMarginTop: { xs: "96px", md: "120px" } }}>
        <Products />
      </Stack>
    </Stack>
  );
}
