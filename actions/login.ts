"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";

export async function login(values: z.infer<typeof LoginSchema>, callbackUrl?: string | null,) {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields",
        };
    }

    return { success: "Email sent" };
}