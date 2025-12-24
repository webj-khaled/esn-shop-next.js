import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

const getHeaders = async () => {
    const cookieStore = await cookies();
    return {
        Cookie: cookieStore.toString(),
    };
};

export const post = async (path: string, formData: FormData) => {
    const headers = await getHeaders();  // Await first
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers  // Now headers is an object, not a Promise
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    const parsedRes = await res.json();
    if (!res.ok) {
        return { error: getErrorMessage(parsedRes) };
    }
    return { error: "" };
};

export const get = async (path: string) => {
    const headers = await getHeaders();  // Await first
    const res = await fetch(`${API_URL}/${path}`, {
        headers: headers,  // Use the awaited headers object
    });
    return res.json();
};