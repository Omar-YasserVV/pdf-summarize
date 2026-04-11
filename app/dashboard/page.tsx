import DashboardFeatureSection from "./components/DashboardFeatureSection"
import DashboardFileUploadZone from "./components/DashboardFileUploadZone"
import DashboardHeader from "./components/DashboardHeader"
import { user } from "@/constants/user"
import DashboardSummarySettings from "./components/DashboardSummarySettings"

function Dashboard() {
  return (
    <div className="flex flex-col gap-5 py-5">
      <DashboardHeader user={user} />
      <DashboardFeatureSection />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <DashboardFileUploadZone />
        </div>
        <div className="md:col-span-1">
          <DashboardSummarySettings />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
