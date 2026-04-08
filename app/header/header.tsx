"use client";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "../auth/auth-context";
import { CartContext } from "../cart/cart-context";
import {
    adminRoutes,
    sharedRoutes,
    unauthenticatedRoutes,
    userRoutes,
} from "../common/constants/routes";

interface HeaderProps {
    logout: () => Promise<void>;
    isAdmin: boolean;
}

interface SettingsProps {
    logout: () => Promise<void>;
}

export default function Header({ logout, isAdmin }: HeaderProps) {
    const isAuthenticated = useContext(AuthContext);
    const { totalItems } = useContext(CartContext);
    const router = useRouter();
    const pathname = usePathname();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [isMobileBannerVisible, setIsMobileBannerVisible] = useState(true);
    const lastScrollYRef = useRef(0);

    const pages = isAuthenticated
        ? [...sharedRoutes, ...(isAdmin ? adminRoutes : userRoutes)]
        : [...sharedRoutes, ...unauthenticatedRoutes];
    const navigationPages = pages.map((page) =>
        page.path === "/cart"
            ? { ...page, title: totalItems > 0 ? `Cart (${totalItems})` : "Cart" }
            : page
    );

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    useEffect(() => {
        const onScroll = () => {
            const mobileView = window.matchMedia("(max-width:899.95px)").matches;
            if (!mobileView) {
                setIsMobileBannerVisible(true);
                lastScrollYRef.current = window.scrollY;
                return;
            }

            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollYRef.current;

            if (currentScrollY <= 8) {
                setIsMobileBannerVisible(true);
            } else if (scrollDelta > 5) {
                setIsMobileBannerVisible(false);
            } else if (scrollDelta < -5) {
                setIsMobileBannerVisible(true);
            }

            lastScrollYRef.current = currentScrollY;
        };

        lastScrollYRef.current = window.scrollY;
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            color="transparent"
            sx={{
                transition: "opacity 260ms ease, transform 260ms ease",
                opacity: { xs: isMobileBannerVisible ? 1 : 0, md: 1 },
                transform: { xs: isMobileBannerVisible ? "translateY(0)" : "translateY(-18px)", md: "translateY(0)" },
                pointerEvents: { xs: isMobileBannerVisible ? "auto" : "none", md: "auto" },
            }}
        >
            <Container maxWidth="xl" sx={{ py: 1.5 }}>
                <Toolbar
                    disableGutters
                    sx={{
                        borderRadius: 999,
                        border: "1px solid rgba(46,49,146,0.17)",
                        bgcolor: "rgba(255,255,255,0.78)",
                        backdropFilter: "blur(10px)",
                        px: { xs: 1, md: 2.5 },
                        minHeight: "72px !important",
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.2}
                        sx={{ display: { xs: "none", md: "inline-flex" }, mr: 2 }}
                        component={Link}
                        href="/"
                    >
                        <Image
                            src="/esn-logo.png"
                            alt="ESN logo"
                            width={64}
                            height={32}
                            priority
                        />
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "primary.dark",
                                    textDecoration: "none",
                                    lineHeight: 1.05,
                                    fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
                                }}
                            >
                                ESN Salzburg
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", letterSpacing: "0.06em" }}
                            >
                                STUDENT NETWORK MERCH
                            </Typography>
                        </Box>
                    </Stack>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="navigation menu"
                            aria-controls="navigation-menu"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="primary"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="navigation-menu"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {navigationPages.map((page) => (
                                <MenuItem
                                    key={page.path}
                                    onClick={() => {
                                        router.push(page.path);
                                        handleCloseNavMenu();
                                    }}
                                >
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            display: { xs: "flex", md: "none" },
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            textDecoration: "none",
                            maxWidth: "calc(100% - 132px)",
                            px: 1,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: "primary.dark",
                                textDecoration: "none",
                                fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            ESN Salzburg Shop
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 0.5 }}>
                        {navigationPages.map((page) => {
                            const active = pathname === page.path;
                            return (
                                <Button
                                    key={page.path}
                                    onClick={() => router.push(page.path)}
                                    sx={{
                                        color: active ? "primary.dark" : "text.secondary",
                                        px: 2,
                                        borderRadius: 999,
                                        backgroundColor: active ? "rgba(0,174,239,0.14)" : "transparent",
                                        border: active
                                            ? "1px solid rgba(0,174,239,0.36)"
                                            : "1px solid transparent",
                                        "&:hover": {
                                            backgroundColor: active
                                                ? "rgba(0,174,239,0.2)"
                                                : "rgba(46,49,146,0.08)",
                                        },
                                    }}
                                >
                                    {page.title}
                                </Button>
                            );
                        })}
                    </Box>

                    {isAuthenticated && <Settings logout={logout} />}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

function Settings({ logout }: SettingsProps) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                        alt="User"
                        sx={{
                            width: 34,
                            height: 34,
                            bgcolor: "secondary.main",
                            border: "2px solid rgba(46,49,146,0.16)",
                        }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-user-settings"
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    key="logout"
                    onClick={async () => {
                        await logout();
                        handleCloseUserMenu();
                    }}
                >
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}
