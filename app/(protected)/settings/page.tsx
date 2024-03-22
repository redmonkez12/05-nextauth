import { auth } from "@/auth";
import { signOut } from "next-auth/react";

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div>
            <form action={async () => {
                "use server";

                await signOut();
            }}>
                <button type="submit">Sign Out</button>
            </form>
        </div>
    );
}