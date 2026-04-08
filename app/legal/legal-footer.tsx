"use client";

import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export default function LegalFooter() {
    const pathname = usePathname();
    const visiblePaths = ["/", "/auth/login", "/auth/signup"];
    if (!visiblePaths.includes(pathname)) {
        return null;
    }

    return (
        <Box
            component="footer"
            sx={{
                borderTop: "1px solid rgba(46,49,146,0.16)",
                mt: 6,
                py: 3,
                background: "rgba(255,255,255,0.68)",
                backdropFilter: "blur(4px)",
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                >
                    <Typography variant="body2" color="text.secondary">
                        (c) {new Date().getFullYear()} All rights reserved.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Link href="/impressum" underline="hover" color="primary.main">
                            Impressum
                        </Link>
                        <Link href="/privacy-notice" underline="hover" color="primary.main">
                            Privacy Notice
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
