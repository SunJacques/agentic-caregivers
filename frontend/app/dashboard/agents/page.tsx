"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Bot, Brain, Activity, ArrowLeft } from "lucide-react"
import { useI18N } from "@/lib/i18n"
import { UUID } from "crypto"
import { createBrowserSupabaseClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/AuthContext"

// Simulated function to get agents for a user
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAgentsForUser = async (userId: UUID) => {
  // In a real application, this would fetch data from an API or database
  const supabase = createBrowserSupabaseClient()
  const user = userId.toString()

  console.log("Fetching agents for user", supabase.from("agents").select("*"))

  const { data: supabaseData } = await supabase
  .from("agents")
  .select("*")
  .eq("docuuid", user)

  console.log("Supabase data", supabaseData)

  if (supabaseData) {
    console.log(supabaseData)
    return supabaseData
  }

  return [
    {
      "id": "1",
      "name": "Heart Failure Management Agent",
      "type": "Specialized",
      "description": "Monitors patients with heart failure, tracking symptoms and medication adherence.",
      "patientCount": 22,
      "alertsToday": 3
    },
    {
      "id": "2",
      "name": "Care Navigation Agent",
      "type": "General",
      "description": "Assists patients in navigating healthcare services and follow-up appointments.",
      "patientCount": 18,
      "alertsToday": 1
    },
    {
      "id": "3",
      "name": "Medication Management Agent",
      "type": "Specialized",
      "description": "Ensures proper medication adherence and tracks potential side effects.",
      "patientCount": 30,
      "alertsToday": 4
    },
    {
      "id": "4",
      "name": "Infectious Disease Monitoring Agent",
      "type": "Specialized",
      "description": "Tracks infectious disease symptoms and alerts for potential outbreaks.",
      "patientCount": 16,
      "alertsToday": 2
    },
    {
      id: "5",
      name: "Physical Therapy Agent",
      type: "Specialized",
      description: "Tracks patient progress in physical therapy exercises",
      patientCount: 10,
      alertsToday: 0,
    },
    {
      id: "6",
      name: "Mental Health Agent",
      type: "Specialized",
      description: "Monitors patient mental health and mood",
      patientCount: 8,
      alertsToday: 1,
    }
  ]
}

export default function AgentsPage() {
  const { t } = useI18N()
  const [agents, setAgents] = useState<any>([])
  const { getUserId } = useAuth()
  // In a real application, you would get the userId from an authentication context
  // UUID userID
  useEffect(() => {
    const fetchAgents = async () => {
      const userId = await getUserId()
      const agents = await getAgentsForUser(userId as UUID)
      setAgents(agents)
    }
    fetchAgents()
  }, [getUserId])

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
        {agents.map((agent: { id: string; name: string; type: string; description: string; patientCount: number; alertsToday: number }) => (
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

