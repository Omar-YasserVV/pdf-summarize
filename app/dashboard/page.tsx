import DashboardFeatureSection from "./components/DashboardFeatureSection"
import DashboardHeader from "./components/DashboardHeader"
import { user } from "@/constants/user"

function Dashboard() {
  return (
    <div className="flex flex-col gap-5 py-5">
      <DashboardHeader user={user} />
      <DashboardFeatureSection />
    </div>
  )
}

export default Dashboard
