"use server";

import { post } from "@/app/common/util/fetch";

interface CompletePasswordRecoveryState {
    error: string;
    success: string;
}

export default async function completePasswordRecovery(
    _prevState: CompletePasswordRecoveryState,
    formData: FormData
): Promise<CompletePasswordRecoveryState> {
    const token = String(formData.get("token") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!token) {
        return { error: "Reset token is missing.", success: "" };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match.", success: "" };
    }

    const { error } = await post("auth/password-recovery/complete", {
        token,
        password,
    });

    if (error) {
        return { error, success: "" };
    }

    return {
        error: "",
        success: "Password reset successful. You can now log in.",
    };
}
