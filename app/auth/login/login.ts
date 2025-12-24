"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormError } from "@/app/common/form-error.interface";
import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";

export default async function login(_prevState: FormError, formData: FormData) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    const parsedRes = await res.json();
    console.log(parsedRes)
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) };
    }


    const setCookieHeader = res.headers.get("Set-Cookie");
    if (setCookieHeader) {
        const token = setCookieHeader.split(";")[0].split("=")[1];
        const cookieStore = await cookies();
        cookieStore.set({
            name: "Authentication",
            value: token,
            secure: true,
            httpOnly: true,
            expires: new Date(jwtDecode(token).exp! * 1000),
        });
    }

    redirect("/")
};
