export async function DashboardData() {
  // Return mock data instead of fetching from Supabase
  return {
    patientsCount: 15,
    alertsCount: 8,
    agentsCount: 3,
    callsCount: 42,
  }
}

