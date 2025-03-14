"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { userService } from "@/services/user.service";

const signInSchema = z.object({
  email: z.string().email("Formato de email inválido").min(3).max(255),
  password: z.string().min(3, "Mínimo 3 caracteres").max(100),
});

export async function signIn(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parseResult = signInSchema.safeParse(raw);
  if (!parseResult.success) {
    return { error: parseResult.error.errors[0].message };
  }
  const { email, password } = parseResult.data;

  let response;
  try {
    response = await userService.login({ email, password });
  } catch {
    return { error: "Email ou senha inválidos. Tente novamente." };
  }

  const { token, user_id } = response.data;

  const cookieStore = await cookies();
  cookieStore.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    sameSite: "none", // se precisar cross-site
  });

  const redirectTo = (formData.get("redirect") as string) || "/dashboard";
  redirect(redirectTo);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  redirect("/");
}

