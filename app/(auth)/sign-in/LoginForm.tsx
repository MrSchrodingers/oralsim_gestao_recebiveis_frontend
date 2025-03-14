"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

// Importamos suas Server Actions para login/cadastro
import { signIn } from "../sign-in/actions"; 
import { signUp } from "../sign-up/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/themeToggle";

type Props = {
  mode?: "signin" | "signup";
};

export default function LoginForm({ mode = "signin" }: Props) {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Caso queira redirecionar após sucesso
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const priceId = searchParams.get("priceId") || "";

  // Essa função é chamada quando o formulário é enviado
  async function handleFormSubmit(formData: FormData) {
    setError("");
    setIsPending(true);

    // Decide se é login ou cadastro
    let result;
    if (mode === "signin") {
      // Chama a Server Action de login
      result = await signIn(formData);
    } else {
      // Chama a Server Action de cadastro
      result = await signUp(formData);
    }

    // Se a Server Action retornar algum erro
    if (result && result.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-950 dark:to-emerald-950/30">
      {/* Botão de toggle de tema (layout intacto) */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            src="/images/OralSimSLogo.png"
            alt="Oralsim Logo"
            width={60}
            height={60}
            className="h-16 w-auto"
          />
        </div>
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
          {mode === "signin" ? "Entre na sua conta" : "Crie sua conta"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {mode === "signin"
            ? "Acesse o Sistema de Gestão de Recebíveis"
            : "Comece a gerenciar seus recebíveis agora"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border-emerald-100 dark:border-emerald-900 shadow-lg dark:shadow-emerald-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-emerald-700 dark:text-emerald-400 font-medium">
              {mode === "signin" ? "Login" : "Cadastro"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Importante: o form utiliza `action={handleFormSubmit}` 
                para chamar a Server Action. */}
            <form action={handleFormSubmit} className="space-y-5">
              <input type="hidden" name="redirect" value={redirect} />
              <input type="hidden" name="priceId" value={priceId} />

              {/* Campo de Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={50}
                    placeholder="Digite seu email"
                    className="border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Campo de Senha */}
              <div>
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Senha
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={
                      mode === "signin" ? "current-password" : "new-password"
                    }
                    required
                    minLength={3}
                    maxLength={100}
                    placeholder="Digite sua senha"
                    className="border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Campos adicionais de Cadastro (nome, role, etc.) */}
              {mode === "signup" && (
                <>
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      className="border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
                      Função
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      type="text"
                      defaultValue="clinic"
                      className="border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clinic_name" className="text-gray-700 dark:text-gray-300">
                      Nome da Clínica (opcional)
                    </Label>
                    <Input
                      id="clinic_name"
                      name="clinic_name"
                      type="text"
                      placeholder="Ex: Minha Clínica"
                      className="border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600"
                    />
                  </div>
                </>
              )}

              {/* Exibição de Erro (se houver) */}
              {error && (
                <div className="text-red-500 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                  {error}
                </div>
              )}

              {/* Botão de Ação (Entrar ou Cadastrar) */}
              <div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex justify-center items-center py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full dark:bg-emerald-700 dark:hover:bg-emerald-600"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Carregando...
                    </>
                  ) : mode === "signin" ? (
                    "Entrar"
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </div>
            </form>

            {/* Link para alternar entre Login e Cadastro */}
            <div className="mt-6">
              <div className="relative flex justify-center text-sm mb-3 text-gray-500 dark:text-gray-400">
                {mode === "signin" ? "Ainda não tem conta?" : "Já tem conta?"}
              </div>
              <div>
                <Link
                  href={
                    mode === "signin"
                      ? `/sign-up?redirect=${redirect}`
                      : `/sign-in?redirect=${redirect}`
                  }
                  className="w-full flex justify-center py-2 px-4 border border-emerald-300 dark:border-emerald-800 rounded-full shadow-sm text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-white dark:bg-gray-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                >
                  {mode === "signin" ? "Criar conta" : "Fazer login"}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
