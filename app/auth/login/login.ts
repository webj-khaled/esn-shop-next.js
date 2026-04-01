"use server";

import { redirect } from "next/navigation";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/app/common/util/errors";
import { normalizeIdentifier } from "@/app/common/util/identifier";
import setAuthenticationCookie from "../set-authentication-cookie";

export default async function login(_prevState: FormResponse, formData: FormData) {
    const body = {
        identifier: normalizeIdentifier(formData.get("identifier")),
        password: formData.get("password"),
    };

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const parsedRes = await res.json();
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) };
    }

    const didSetCookie = await setAuthenticationCookie(
        res.headers.get("Set-Cookie")
    );
    if (!didSetCookie) {
        return {
            error: "Login succeeded but no session cookie was returned.",
        };
    }

    redirect("/");
}

