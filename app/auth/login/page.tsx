"use client";

import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useActionState } from "react";
import login from "./login";

export default function Login() {
    const [state, formAction] = useActionState(login, { error: "" });

    return (
        <form action={formAction} className="w-full">
            <Stack spacing={2.2}>
                <Typography variant="h4">Welcome back</Typography>
                <Typography variant="body2" color="text.secondary">
                    Sign in to continue shopping ESN Salzburg merch.
                </Typography>
                <TextField
                    error={!!state.error}
                    helperText={state.error}
                    name="identifier"
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                />
                <TextField
                    error={!!state.error}
                    helperText={state.error}
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                />
                <Button type="submit" variant="contained" fullWidth>
                    Login
                </Button>
                <Link component={NextLink} href="/auth/forgot-password" className="self-center">
                    Forgot Password?
                </Link>
                <Link component={NextLink} href="/auth/signup" className="self-center">
                    Signup
                </Link>
            </Stack>
        </form>
    );
}
