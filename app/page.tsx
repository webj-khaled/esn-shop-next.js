import { Stack, Typography } from "@mui/material";
import ModelLookHero from "./home/model-look-hero";
import Products from "./products/products";

export default async function Home() {
  return (
    <Stack spacing={{ xs: 4, md: 6 }} className="esn-fade-up">
      <Stack alignItems="center" sx={{ px: { xs: 1, md: 2 }, pt: { xs: 0.5, md: 0 } }}>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 820,
            textAlign: "center",
            fontFamily: '"Poppins", "Segoe UI", "Trebuchet MS", sans-serif',
            fontWeight: 600,
            letterSpacing: "0.01em",
            fontSize: { xs: "1.08rem", md: "1.24rem" },
            lineHeight: 1.4,
            background: "linear-gradient(90deg, #b13a79 0%, #3f63ad 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Wear a piece of Salzburg home and keep your Erasmus memories close every day.
        </Typography>
      </Stack>

      <ModelLookHero />

      <Stack id="shop-selection" sx={{ scrollMarginTop: { xs: "96px", md: "120px" } }}>
        <Products />
      </Stack>
    </Stack>
  );
}
