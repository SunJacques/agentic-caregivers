"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, User, Plus } from "lucide-react"
import { useI18N } from "@/lib/i18n"

import { useEffect, useState } from "react"

// Mock patient data
const mockPatients = [
  {
    id: "p1",
    name: "John Doe",
    date_of_birth: "1980-05-15",
    condition: "Hypertension, Diabetes",
    assigned_agent: "Patient Follow-up Bot"
  },
  {
    id: "p2",
    name: "Jane Smith",
    date_of_birth: "1975-11-23",
    condition: "Asthma",
    assigned_agent: "Medication Reminder"
  },
  {
    id: "p3",
    name: "Robert Johnson",
    date_of_birth: "1990-03-08",
    condition: "Post-Surgery Recovery",
    assigned_agent: "Patient Follow-up Bot"
  },
  {
    id: "p4",
    name: "Emily Davis",
    date_of_birth: "1988-07-12",
    condition: "Pregnancy",
    assigned_agent: "Appointment Scheduler"
  },
  {
    id: "p5",
    name: "Michael Wilson",
    date_of_birth: "1965-09-30",
    condition: "Heart Disease",
    assigned_agent: "Medication Reminder"
  }
];

export default function PatientsPage() {
  const { t } = useI18N()


  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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

      {error && <p className="text-red-500">{error}</p>}

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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    {t("loading")}
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.date_of_birth}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>{patient.assigned_agent}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/patients/${patient.id}`}>
                        <Button variant="outline" size="sm">
                          {t("viewDetails")}
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}