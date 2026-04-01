"use server";

import { post } from "@/app/common/util/fetch";

interface ConfirmCheckoutRequest {
    sessionId: string;
}

export default async function confirmCheckout(request: ConfirmCheckoutRequest) {
    return post("checkout/confirm", request);
}
