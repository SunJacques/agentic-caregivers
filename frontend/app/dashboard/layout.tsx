"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Users, Bell, Bot, Phone } from "lucide-react"
import type React from "react"
import { useI18N, I18NProvider } from "@/lib/i18n"
import LanguageSwitcher from "@/components/LanguageSwitcher"

import Image from "next/image"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/patients", icon: Users, label: "Patients" },
  { href: "/dashboard/agents", icon: Bot, label: "AI Agents" },
  { href: "/dashboard/alerts", icon: Bell, label: "Alerts" },
  { href: "/dashboard/calls", icon: Phone, label: "Calls" },
]

const DashboardNavigation = () => {
  const { t } = useI18N()

  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link href={item.href} key={item.href}>
          <Button variant="ghost" className="w-full justify-start">
            <item.icon className="mr-2 h-4 w-4" />
            {t(item.label)}
          </Button>
        </Link>
      ))}

    </nav>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <I18NProvider>
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Image src="/icon.png" alt="Agentic CareGivers" width={60} height={40} />
              Agentic CareGivers
            </div>
            <LanguageSwitcher />
          </div>
          <div className="flex-grow p-4">
            <DashboardNavigation />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </I18NProvider>
  )
}

