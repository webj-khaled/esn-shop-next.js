"use server";

import { cookies } from "next/headers";
import { API_URL } from "@/app/common/constants/api";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

export interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export default async function getAuthState(): Promise<AuthState> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTHENTICATION_COOKIE)?.value;
    if (!token) {
        return { isAuthenticated: false, isAdmin: false };
    }

    const response = await fetch(`${API_URL}/auth/state`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    if (!response.ok) {
        return { isAuthenticated: false, isAdmin: false };
    }

    const payload = (await response.json()) as {
        authenticated?: boolean;
        isAdmin?: boolean;
    };

    if (!payload.authenticated) {
        return { isAuthenticated: false, isAdmin: false };
    }

    return { isAuthenticated: true, isAdmin: !!payload.isAdmin };
}
