"use server";

import { redirect } from "next/navigation";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { API_URL } from "@/app/common/constants/api";
import { post } from "@/app/common/util/fetch";
import { getErrorMessage } from "@/app/common/util/errors";
import { normalizeIdentifier } from "@/app/common/util/identifier";
import setAuthenticationCookie from "../set-authentication-cookie";

export default async function createUser(
    _prevState: FormResponse,
    formData: FormData
) {
    const normalized = normalizeIdentifier(formData.get("identifier"));
    const body = { identifier: normalized, password: formData.get("password") };
    const { error: signupError } = await post("users", body);
    if (signupError) {
        return { error: signupError };
    }

    const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const parsedLoginResponse = await loginResponse.json();
    if (!loginResponse.ok) {
        return { error: getErrorMessage(parsedLoginResponse) };
    }

    const didSetCookie = await setAuthenticationCookie(
        loginResponse.headers.get("Set-Cookie")
    );
    if (!didSetCookie) {
        return { error: "Account created, but automatic login failed." };
    }

    redirect("/");
}
