"use client";

import { Alert, Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import completePasswordRecovery from "./complete-password-recovery";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = (searchParams.get("token") ?? "").trim();
    const [state, formAction] = useActionState(completePasswordRecovery, {
        error: "",
        success: "",
    });

    if (!token) {
        return (
            <Stack spacing={2} className="w-full">
                <Alert severity="error">Reset token is missing.</Alert>
                <Link component={NextLink} href="/auth/forgot-password">
                    Request a new reset link
                </Link>
            </Stack>
        );
    }

    return (
        <form action={formAction} className="w-full">
            <Stack spacing={2.2}>
                <input type="hidden" name="token" value={token} />
                <Alert severity="info">
                    Use a strong password with upper/lowercase letters, numbers, and symbols.
                </Alert>
                <TextField
                    name="password"
                    label="New Password"
                    variant="outlined"
                    type="password"
                    required
                />
                <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    required
                />
                {state.error && <Alert severity="error">{state.error}</Alert>}
                {state.success && <Alert severity="success">{state.success}</Alert>}
                <SubmitButton />
                <Link component={NextLink} href="/privacy-notice" className="self-center">
                    Privacy Notice
                </Link>
                <Link component={NextLink} href="/auth/login" className="self-center">
                    Back to Login
                </Link>
            </Stack>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" variant="contained" disabled={pending} fullWidth>
            {pending ? "Resetting..." : "Reset Password"}
        </Button>
    );
}
