"use client";

import { alpha, createTheme } from "@mui/material/styles";

const esn = {
    navy: "#141A4A",
    blue: "#2E3192",
    cyan: "#00AEEF",
    magenta: "#EC008C",
    green: "#7AC143",
    yellow: "#F9A01B",
    paper: "#FFFFFF",
    background: "#F4F6FF",
};

const titleFontFamily =
    '"Monotype Corsiva", "Lucida Calligraphy", "Apple Chancery", "URW Chancery L", "Book Antiqua", serif';

const darkTheme = createTheme({
    shape: {
        borderRadius: 16,
    },
    palette: {
        mode: "light",
        primary: {
            main: esn.blue,
            dark: "#242770",
            light: "#4E52B6",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: esn.magenta,
            dark: "#BF006E",
            light: "#F34CA9",
            contrastText: "#FFFFFF",
        },
        info: {
            main: esn.cyan,
        },
        success: {
            main: esn.green,
        },
        warning: {
            main: esn.yellow,
        },
        background: {
            default: esn.background,
            paper: esn.paper,
        },
        text: {
            primary: "#1B2058",
            secondary: "#4F568C",
        },
        divider: alpha(esn.blue, 0.16),
    },
    typography: {
        fontFamily: '"Trebuchet MS", "Gill Sans", "Segoe UI", sans-serif',
        h1: {
            fontFamily: titleFontFamily,
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },
        h2: {
            fontFamily: titleFontFamily,
            fontWeight: 700,
            letterSpacing: "-0.015em",
        },
        h3: {
            fontFamily: titleFontFamily,
            fontWeight: 700,
            letterSpacing: "-0.01em",
        },
        h4: {
            fontFamily: titleFontFamily,
            fontWeight: 700,
        },
        h5: {
            fontFamily: titleFontFamily,
            fontWeight: 700,
        },
        h6: {
            fontFamily: titleFontFamily,
            fontWeight: 700,
        },
        button: {
            textTransform: "none",
            fontWeight: 700,
            letterSpacing: "0.01em",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ":root": {
                    colorScheme: "light",
                },
                "::selection": {
                    backgroundColor: alpha(esn.cyan, 0.35),
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: esn.navy,
                    backgroundImage: "none",
                    borderRadius: 0,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    border: `1px solid ${alpha(esn.blue, 0.14)}`,
                    boxShadow: "0 14px 32px rgba(31, 40, 109, 0.08)",
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    paddingInline: 18,
                    minHeight: 42,
                },
                containedPrimary: {
                    background: `linear-gradient(120deg, ${esn.blue} 0%, #4045B9 100%)`,
                },
                containedSecondary: {
                    background: `linear-gradient(120deg, ${esn.magenta} 0%, #C40078 100%)`,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    fontWeight: 700,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    backgroundColor: alpha("#FFFFFF", 0.82),
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 14,
                    border: `1px solid ${alpha(esn.blue, 0.2)}`,
                    boxShadow: "0 16px 34px rgba(31, 40, 109, 0.18)",
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                },
            },
        },
    },
});

export default darkTheme;
