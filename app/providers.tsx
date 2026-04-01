"use client";

import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactNode } from "react";
import darkTheme from "./dark.theme";
import { AuthContext } from "./auth/auth-context";
import { CartProvider } from "./cart/cart-context";

interface ProviderProps {
    children: ReactNode;
    authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProviderProps) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
                <AuthContext.Provider value={authenticated}>
                    <CartProvider>{children}</CartProvider>
                </AuthContext.Provider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
