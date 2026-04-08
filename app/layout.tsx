import type { Metadata } from "next";
import "./globals.css";
import { Box, Container, CssBaseline } from "@mui/material";
import Header from "./header/header";
import Providers from "./providers";
import logout from "./auth/logout";
import getAuthState from "./auth/actions/get-auth-state";
import LegalFooter from "./legal/legal-footer";

export const metadata: Metadata = {
  title: "ESN Salzburg Shop",
  description: "Erasmus Student Network Salzburg merchandise store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isAdmin } = await getAuthState();

  return (
    <html lang="en">
      <body>
        <Providers authenticated={isAuthenticated}>
          <CssBaseline />
          <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header logout={logout} isAdmin={isAdmin} />
            <Container
              sx={{
                flex: 1,
                py: { xs: 3, md: 5 },
              }}
            >
              {children}
            </Container>
            <LegalFooter />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
