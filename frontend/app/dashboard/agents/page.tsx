"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Bot, Brain, Activity, ArrowLeft } from "lucide-react"
import { useI18N } from "@/lib/i18n"
import { useEffect, useState } from "react"


// Mock data for agents
const mockAgents = [
  {
    id: "1",
    name: "Patient Follow-up Bot",
    description: "Automated follow-up with patients after hospital discharge",
    type: "Follow-up",
    patientCount: 24,
    alertsToday: 3
  },
  {
    id: "2",
    name: "Medication Reminder",
    description: "Reminds patients about their medication schedule",
    type: "Reminder",
    patientCount: 42,
    alertsToday: 7
  },
  {
    id: "3",
    name: "Appointment Scheduler",
    description: "Helps patients schedule and manage appointments",
    type: "Scheduling",
    patientCount: 18,
    alertsToday: 0
  }
]

export default function AgentsPage() {
  const { t } = useI18N()
  const [agents, setAgents] = useState<any[]>([])


  useEffect(() => {
    // Instead of fetching from Supabase, use the mock data
    setAgents(mockAgents)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="flex items-center mb-4 text-blue-500 hover:underline">
        <ArrowLeft className="mr-2" />
        {t("backToDashboard")}
      </Link>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t("yourAIAgents")}</h1>
        <div>
          <Link href="/dashboard/agents/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> {t("createNewAgent")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                {agent.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-blue-500" />
                  <span>{agent.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span>
                    {agent.patientCount} {t("patients")}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-red-500 font-semibold">
                  {agent.alertsToday} {t("alertsToday")}
                </span>
                <Link href={`/dashboard/agents/${agent.id}`}>
                  <Button variant="outline" size="sm">
                    {t("viewDetails")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}