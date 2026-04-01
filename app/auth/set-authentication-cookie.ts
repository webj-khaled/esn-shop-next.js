"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "./auth-cookie";

type JwtPayload = {
    exp?: number;
};

export default async function setAuthenticationCookie(setCookieHeader: string | null) {
    if (!setCookieHeader) {
        return false;
    }

    const token = setCookieHeader.split(";")[0]?.split("=")[1];
    if (!token) {
        return false;
    }

    const payload = jwtDecode<JwtPayload>(token);
    if (!payload.exp) {
        return false;
    }

    const cookieStore = await cookies();
    cookieStore.set({
        name: AUTHENTICATION_COOKIE,
        value: token,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(payload.exp * 1000),
        path: "/",
    });

    return true;
}
