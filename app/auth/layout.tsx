import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 180px)",
                display: "grid",
                placeItems: "center",
                py: { xs: 4, md: 6 },
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                    width: "100%",
                    maxWidth: 980,
                }}
                className="esn-fade-up"
            >
                <Card
                    sx={{
                        flex: 1.2,
                        p: { xs: 2.5, md: 3.5 },
                        background:
                            "linear-gradient(155deg, rgba(46,49,146,0.93) 0%, rgba(0,174,239,0.8) 58%, rgba(236,0,140,0.78) 100%)",
                        color: "white",
                    }}
                >
                    <Stack spacing={2.2}>
                        <Chip
                            label="Erasmus Student Network"
                            sx={{
                                width: "fit-content",
                                bgcolor: "rgba(255,255,255,0.16)",
                                color: "white",
                                border: "1px solid rgba(255,255,255,0.28)",
                            }}
                        />
                        <Typography variant="h3">ESN Salzburg Shop</Typography>
                        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                            Join the community, manage your orders, and represent your
                            Erasmus journey with official ESN merchandise.
                        </Typography>
                    </Stack>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>{children}</CardContent>
                </Card>
            </Stack>
        </Box>
    );
}
