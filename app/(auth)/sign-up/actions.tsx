"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { userService } from "@/services/user.service";

const signUpSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
  role: z.string().default("clinic"),
  name: z.string(),
  clinic_name: z.string().optional(),
});

export async function signUp(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parseResult = signUpSchema.safeParse(raw);
  if (!parseResult.success) {
    return { error: parseResult.error.errors[0].message };
  }

  try {
    await userService.create(parseResult.data);
    const redirectTo = (formData.get("redirect") as string) || "/dashboard";
    redirect(redirectTo);
  } catch (error: any) {
    return { error: "Falha ao criar usuário. Verifique os dados e tente novamente." };
  }
}
