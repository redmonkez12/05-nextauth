import bcrypt from "bcrypt";
import { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Credential from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credential({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const { email, password } = validateFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) {
                        return null;
                    }

                    return null;
                }
            }
        }),
    ],
} satisfies NextAuthConfig;
