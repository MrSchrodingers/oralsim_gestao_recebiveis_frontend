import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, Database, FileText } from "lucide-react"
import { Terminal } from "./terminal"
import { ThemeToggle } from "@/components/themeToggle"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="absolute top-4 right-4 md:hidden">
        <ThemeToggle />
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-5xl md:text-6xl">
                Oralsim
                <span className="block text-emerald-600 dark:text-emerald-400">Sistema de Gestão de Recebíveis</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Gerencie os recebíveis da sua clínica ortodôntica com eficiência e precisão. Acompanhe pagamentos, gere
                relatórios e otimize seu fluxo de caixa.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Link href="/sign-in" passHref>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                    Acessar o sistema
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 dark:bg-emerald-700 text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Gestão de Faturas</h2>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Crie, envie e acompanhe faturas de forma automatizada, garantindo um controle eficiente dos pagamentos
                  dos pacientes.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 dark:bg-emerald-700 text-white">
                <Database className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Relatórios Detalhados</h2>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Acesse relatórios completos sobre a situação financeira da clínica, com análises de recebíveis,
                  inadimplência e projeções futuras.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600 dark:bg-emerald-700 text-white">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Múltiplas Formas de Pagamento</h2>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Ofereça flexibilidade aos seus pacientes com diversas opções de pagamento, incluindo cartões, boletos
                  e transferências bancárias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Pronto para otimizar a gestão financeira da sua clínica?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
                O Sistema de Gestão de Recebíveis da Oralsim foi desenvolvido especificamente para clínicas
                ortodônticas, atendendo às necessidades específicas do seu negócio e ajudando a melhorar o fluxo de
                caixa.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-full text-xl px-12 py-6 inline-flex items-center justify-center">
                Solicitar demonstração
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

