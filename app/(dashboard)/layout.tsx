"use client"

import type React from "react"

import Link from "next/link"
import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Home, LogOut, FileText, Settings } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { ThemeProvider, ThemeScript } from "@/components/themeProvider"
import { ThemeToggle } from "@/components/themeToggle"
import { signOut } from "../(auth)/sign-in/actions"
import { useAuth } from "@/contexts/AuthContext"

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.refresh()
    router.push("/")
  }

  if (!user) {
    return (
      <>
        <Link href="/planos" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          Planos
        </Link>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-full">
          <Link href="/sign-up">Cadastrar</Link>
        </Button>
      </>
    )
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ""} />
          <AvatarFallback>
            {user.email
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/recebimentos" className="flex w-full items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Recebimentos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/configuracoes" className="flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/OralSimSLogo.png"
            alt="Oralsim Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="ml-2 text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400 font-sans">
            Oralsim
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeScript />
      <section className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Header />
        {children}
      </section>
    </>
  );
}
