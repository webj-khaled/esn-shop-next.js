"use client";

import { Box, Stack } from "@mui/material";
import { TouchEvent, useEffect, useRef, useState } from "react";

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
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const goToNextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  const goToPreviousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1
    );
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX;
    if (typeof touchEndX !== "number") {
      touchStartXRef.current = null;
      return;
    }

    const touchEndY = event.changedTouches[0]?.clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY =
      typeof touchEndY === "number" && typeof touchStartYRef.current === "number"
        ? touchEndY - touchStartYRef.current
        : 0;
    const swipeThreshold = 34;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY) + 8;

    if (isHorizontalSwipe) {
      if (deltaX > 0) {
        goToPreviousSlide();
      } else {
        goToNextSlide();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleTouchCancel = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <Stack spacing={2}>
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        sx={{
          position: "relative",
          minHeight: { xs: 520, md: 700 },
          borderRadius: 0,
          overflow: "hidden",
          boxShadow: "0 22px 46px rgba(20, 26, 74, 0.2)",
          touchAction: "pan-y",
          userSelect: "none",
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
    </Stack>
  );
}
