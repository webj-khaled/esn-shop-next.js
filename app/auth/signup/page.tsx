"use client";

import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useActionState } from "react";
import createUser from "./create-user";

export default function Signup() {
    const [state, formAction] = useActionState(createUser, { error: "" });

    return (
        <form action={formAction} className="w-full">
            <Stack spacing={2.2}>
                <Typography variant="h4">Create account</Typography>
                <Typography variant="body2" color="text.secondary">
                    Join ESN Salzburg Shop to track your orders and checkout faster.
                </Typography>
                <TextField
                    name="identifier"
                    label="Email"
                    variant="outlined"
                    type="email"
                    helperText={state.error}
                    error={!!state.error}
                    required
                />
                <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    helperText={state.error}
                    error={!!state.error}
                    required
                />
                <Button type="submit" variant="contained" fullWidth>
                    Signup
                </Button>
                <Link component={NextLink} href="/auth/login" className="self-center">
                    Login
                </Link>
            </Stack>
        </form>
    );
}
