"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { IUser } from "@/interfaces/IUser"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react"
import { SettingsLoading } from "./loading"

export function Settings() {
  const { user } = useAuth();
  console.log(user)

  if (!user) {
    return <SettingsLoading />
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6 text-emerald-800 dark:text-emerald-400">
        Configurações da {user?.name.split(" ")[0] + ' de ' + user?.name.split(" ")[1]}
      </h1>
      <Card className="mb-8 border-emerald-100 dark:border-emerald-900 shadow-sm">
        <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20 rounded-t-lg">
          <CardTitle className="text-emerald-700 dark:text-emerald-400">Plano de Assinatura</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">
                  Plano Atual: <span className="text-emerald-600 dark:text-emerald-400">{"Gratuito"}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {"active" === "active"
                    ? "Cobrança mensal"
                    : "trialing" === "trialing"
                      ? "Período de teste"
                      : "Sem assinatura ativa"}
                </p>
              </div>
              <Button
                variant="outline"
                className="border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/30"
              >
                Gerenciar Assinatura
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <Card className="border-emerald-100 dark:border-emerald-900 shadow-sm">
        <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20 rounded-t-lg">
          <CardTitle className="text-emerald-700 dark:text-emerald-400">Convidar Novo Membro</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email do novo membro"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
            />
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600">
              Enviar Convite
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </section>
  )
}

