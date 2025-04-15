"use server";

import { signIn, signOut } from "../lib/auth";

export async function handleAuth() {
  await signIn("google");
}

export async function handleSignOut() {
  await signOut({
    redirectTo: "/login",
  });
}
