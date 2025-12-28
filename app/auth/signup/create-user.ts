"use server";

import { redirect } from "next/navigation";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import { post } from "@/app/common/util/fetch";

export default async function createUser(
    _prevState: FormResponse,
    formData: FormData
) {
    const { error } = await post("users", formData);
    if (error) {
        return { error };
    }
    redirect("/");
}