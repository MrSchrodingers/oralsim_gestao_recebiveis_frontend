"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Users,
  Settings,
  Menu,
  BarChart3,
  LogOutIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/themeToggle";
import { signOut } from "@/app/(auth)/sign-in/actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { href: "/dashboard/patients", icon: Users, label: "Pacientes" },
    { href: "/dashboard/configuracoes", icon: Settings, label: "Configurações" },
    { href: "/dashboard/sign-out", icon: LogOutIcon, label: "Sair" },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full bg-white dark:bg-gray-950">
      <div className="lg:hidden flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center">
          <span className="font-medium text-gray-900 dark:text-white">Oralsim</span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button
            className="-mr-3"
            variant="ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 lg:block ${
            isSidebarOpen ? "block" : "hidden"
          } lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 hidden lg:flex items-center justify-between">
            <span className="font-medium text-emerald-800 dark:text-emerald-400">
              Painel de Controle
            </span>
            <ThemeToggle />
          </div>
          <nav className="h-full overflow-y-auto p-4">
            {navItems.map((item) =>
              item.href === "/dashboard/sign-out" ? (
                <form action={signOut} key={item.href}>
                  <Button
                    type="submit"
                    variant={
                      pathname === item.href ? "secondary" : "ghost"
                    }
                    className={`shadow-none my-1 w-full justify-start ${
                      pathname === item.href
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon
                      className={`mr-2 h-4 w-4 ${
                        pathname === item.href
                          ? "text-emerald-600 dark:text-emerald-400"
                          : ""
                      }`}
                    />
                    {item.label}
                  </Button>
                </form>
              ) : (
                <Link key={item.href} href={item.href} passHref>
                  <Button
                    variant={
                      pathname === item.href ? "secondary" : "ghost"
                    }
                    className={`shadow-none my-1 w-full justify-start ${
                      pathname === item.href
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon
                      className={`mr-2 h-4 w-4 ${
                        pathname === item.href
                          ? "text-emerald-600 dark:text-emerald-400"
                          : ""
                      }`}
                    />
                    {item.label}
                  </Button>
                </Link>
              )
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-0 lg:p-4 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
