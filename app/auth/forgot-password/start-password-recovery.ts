"use server";

import { post } from "@/app/common/util/fetch";
import { normalizeIdentifier } from "@/app/common/util/identifier";

interface PasswordRecoveryStartState {
    error: string;
    success: string;
}

export default async function startPasswordRecovery(
    _prevState: PasswordRecoveryStartState,
    formData: FormData
): Promise<PasswordRecoveryStartState> {
    const identifier = normalizeIdentifier(formData.get("identifier"));
    const { error, data } = await post("auth/password-recovery/start", {
        identifier,
    });

    if (error) {
        return { error, success: "" };
    }

    const message =
        data &&
            typeof data === "object" &&
            "message" in data &&
            typeof (data as { message?: unknown }).message === "string"
            ? (data as { message: string }).message
            : "If an account exists for this email, a password reset link was sent.";

    return { error: "", success: message };
}
