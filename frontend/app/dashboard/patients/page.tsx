"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, User, Plus } from "lucide-react"
import { useI18N } from "@/lib/i18n"

// Mock data for patients
const patients = [
  {
    id: 1,
    name: "John Doe",
    dateOfBirth: "1980-05-15",
    condition: "Post-cardiac surgery",
    assignedAgent: "Cardiac Agent",
  },
  { id: 2, name: "Jane Smith", dateOfBirth: "1992-11-23", condition: "Diabetes", assignedAgent: "Diabetes Agent" },
  {
    id: 3,
    name: "Alice Johnson",
    dateOfBirth: "1975-08-30",
    condition: "Post-hip replacement",
    assignedAgent: "Orthopedic Agent",
  },
  { id: 4, name: "Bob Williams", dateOfBirth: "1988-03-12", condition: "Asthma", assignedAgent: "Respiratory Agent" },
  { id: 5, name: "Carol Brown", dateOfBirth: "1970-01-25", condition: "Hypertension", assignedAgent: "Cardiac Agent" },
]

export default function PatientsPage() {
  const { t } = useI18N()

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="flex items-center mb-4 text-blue-500 hover:underline">
        <ArrowLeft className="mr-2" />
        {t("backToDashboard")}
      </Link>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("patients")}</h1>
        <Link href="/dashboard/patients/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("addNewPatient")}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2" />
            {t("patientsList")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("dateOfBirth")}</TableHead>
                <TableHead>{t("condition")}</TableHead>
                <TableHead>{t("assignedAgent")}</TableHead>
                <TableHead>{t("action")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>{patient.assignedAgent}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/patients/${patient.id}`}>
                      <Button variant="outline" size="sm">
                        {t("viewDetails")}
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

