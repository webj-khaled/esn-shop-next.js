"use client";

import { Alert, Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useActionState } from "react";
import startPasswordRecovery from "./start-password-recovery";

export default function ForgotPasswordPage() {
    const [state, formAction] = useActionState(startPasswordRecovery, {
        error: "",
        success: "",
    });

    return (
        <form action={formAction} className="w-full max-w-xs">
            <Stack spacing={2}>
                <TextField
                    name="identifier"
                    label="Email"
                    variant="outlined"
                    type="email"
                    helperText={state.error || " "}
                    error={!!state.error}
                    required
                />
                {state.success && <Alert severity="success">{state.success}</Alert>}
                <Button type="submit" variant="contained">
                    Send Reset Link
                </Button>
                <Link component={NextLink} href="/auth/login" className="self-center">
                    Back to Login
                </Link>
            </Stack>
        </form>
    );
}
