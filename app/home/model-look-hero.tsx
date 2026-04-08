"use client";

import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface HeroSlide {
  id: string;
  image: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: "black-shirt",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "white-shirt",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "group-look",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function ModelLookHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleScrollToShop = () => {
    const section = document.getElementById("shop-selection");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 520, md: 700 },
          borderRadius: 0,
          overflow: "hidden",
          boxShadow: "0 22px 46px rgba(20, 26, 74, 0.2)",
        }}
      >
        {heroSlides.map((slide, index) => (
          <Box
            key={slide.id}
            aria-hidden={index !== activeSlide}
            sx={{
              position: "absolute",
              inset: 0,
              opacity: index === activeSlide ? 1 : 0,
              transform: index === activeSlide ? "scale(1)" : "scale(1.03)",
              transition: "opacity 820ms ease, transform 820ms ease",
              backgroundImage: `
                linear-gradient(120deg, rgba(20,26,74,0.32) 0%, rgba(46,49,146,0.18) 42%, rgba(236,0,140,0.08) 100%),
                url(${slide.image})
              `,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </Box>

      <Stack direction="row" spacing={1} justifyContent="center">
        {heroSlides.map((slide, index) => (
          <Box
            key={slide.id}
            component="button"
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            sx={{
              border: "none",
              cursor: "pointer",
              width: index === activeSlide ? 38 : 12,
              height: 12,
              borderRadius: 999,
              bgcolor: index === activeSlide ? "secondary.main" : "rgba(46,49,146,0.28)",
              transition: "all 220ms ease",
            }}
          />
        ))}
      </Stack>

      <Stack alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleScrollToShop}
          sx={{ px: 3.5, py: 1.15, fontWeight: 700 }}
        >
          Buy Now
        </Button>
      </Stack>
    </Stack>
  );
}
