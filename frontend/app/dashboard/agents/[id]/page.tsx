"use client";

import { useState, useEffect } from "react"
import { 
  // useParams, 
  useRouter 
} from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Bot, Brain, Users, Activity, Calendar, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18N } from "@/lib/i18n"

type Agent = {
  id: string
  name: string
  type: string
  description: string
  capabilities: string[]
  assignedPatients: number
  callsMade: number
}

type Patient = {
  id: string
  name: string
  dateOfBirth: string
  lastContact: string
  status: "Stable" | "Needs Attention" | "Critical"
}

type Activity = {
  id: string
  type: "Call" | "Alert" | "Update"
  description: string
  date: string
  patientName: string
}

type Alert = {
  id: string
  patientName: string
  type: string
  severity: "Low" | "Medium" | "High"
  status: "Open" | "Resolved"
}

// const fetchAgentDetails = async (id: string) => {
//   const res = await fetch(/api/agents/${id})
//   if (!res.ok) throw new Error("Failed to fetch agent details")
//   return res.json()
// }

// const fetchAssignedPatients = async (id: string) => {
//   const res = await fetch(/api/agents/${id}/patients)
//   if (!res.ok) throw new Error("Failed to fetch assigned patients")
//   return res.json()
// }

// const fetchRecentActivities = async (id: string) => {
//   const res = await fetch(/api/agents/${id}/activities)
//   if (!res.ok) throw new Error("Failed to fetch recent activities")
//   return res.json()
// }

// const fetchAlerts = async (id: string) => {
//   const res = await fetch(/api/agents/${id}/alerts)
//   if (!res.ok) throw new Error("Failed to fetch alerts")
//   return res.json()
// }

export default function AgentDetailsPage() {
  const router = useRouter()
  // const params = useParams()
  const { t } = useI18N()

  const [agent, setAgent] = useState<Agent | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [timeRange, setTimeRange] = useState("week")

  useEffect(() => {
    // Simulating data fetch with mock data
    const agentData: Agent = {
      id: "1",
      name: "Agent 1",
      type: "Clinical Assistant",
      description: "Helps in managing patient care and consultations.",
      capabilities: ["Real-time monitoring", "Consultation", "Reporting"],
      assignedPatients: 5,
      callsMade: 15,
    }
    const patientData: Patient[] = [
      { id: "1", name: "John Doe", dateOfBirth: "1990-01-01", lastContact: "2025-02-10", status: "Stable" },
      { id: "2", name: "Jane Smith", dateOfBirth: "1985-05-22", lastContact: "2025-02-11", status: "Needs Attention" },
    ]
    const activityData: Activity[] = [
      { id: "1", type: "Call", description: "Consultation for patient care", date: "2025-02-10", patientName: "John Doe" },
      { id: "2", type: "Alert", description: "Critical status alert for Jane Smith", date: "2025-02-11", patientName: "Jane Smith" },
    ]
    const alertData: Alert[] = [
      { id: "1", patientName: "John Doe", type: "Heart Rate", severity: "Low", status: "Resolved" },
      { id: "2", patientName: "Jane Smith", type: "Blood Pressure", severity: "High", status: "Open" },
    ]

    setAgent(agentData)
    setPatients(patientData)
    setActivities(activityData)
    setAlerts(alertData)
  }, [])

  if (!agent) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/dashboard/agents" className="flex items-center mb-4 text-blue-500 hover:underline">
        <ArrowLeft className="mr-2" />
        {t("backToAgents")}
      </Link>
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Bot className="mr-2 h-8 w-8 text-blue-500" />
        {agent.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-blue-500" />
              {t("agentDetails")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("agentType")}:</strong> {agent.type}
            </p>
            <p>
              <strong>{t("description")}:</strong> {agent.description}
            </p>
            <div className="mt-4">
              <strong>{t("capabilities")}:</strong>
              <ul className="list-disc list-inside">
                {agent.capabilities.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-green-500" />
              {t("agentStatistics")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">{agent.assignedPatients}</p>
                <p className="text-sm text-gray-500">{t("assignedPatients")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{agent.callsMade}</p>
                <p className="text-sm text-gray-500">{t("callsMade")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-500" />
              {t("assignedPatients")}
            </div>
            <Button onClick={() => router.push("/dashboard/patients/associate")}>{t("assignNewPatient")}</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("dateOfBirth")}</TableHead>
                <TableHead>{t("lastContact")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell>{patient.lastContact}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === "Stable"
                          ? "bg-green-200 text-green-800"
                          : patient.status === "Needs Attention"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                      }`}
                    >
                      {t(`patients.status.${patient.status}`)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/patients/${patient.id}`)}
                    >
                      {t("viewDetails")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
            {t("alertMapping")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("alertId")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("alertType")}</TableHead>
                <TableHead>{t("severity")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.id}</TableCell>
                  <TableCell>{alert.patientName}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        alert.severity === "Low"
                          ? "bg-green-200 text-green-800"
                          : alert.severity === "Medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                      }`}
                    >
                      {t(`common.severity.${alert.severity}`)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        alert.status === "Open" ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {t(`common.status.${alert.status}`)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/alerts/${alert.id}`)}>
                      {t("viewDetails")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              {t("recentActivities")}
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("selectTimeRange")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">{t("last24Hours")}</SelectItem>
                <SelectItem value="week">{t("lastWeek")}</SelectItem>
                <SelectItem value="month">{t("lastMonth")}</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("type")}</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("description")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        activity.type === "Call"
                          ? "bg-blue-200 text-blue-800"
                          : activity.type === "Alert"
                            ? "bg-red-200 text-red-800"
                            : "bg-green-200 text-green-800"
                      }`}
                    >
                      {t(`agents.activityType.${activity.type}`)}
                    </span>
                  </TableCell>
                  <TableCell>{activity.patientName}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
