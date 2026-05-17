import ProfileHeader from './components/ProfileHeader'
import DashboardStats from './components/DashboardStats'
import UpgradePremium from './components/UpgradePremium'
import ActivitySummary from './components/ActivitySummary'
import AchievementsGrid from './components/AchievementsGrid'

function profile() {
  return (
    <div className="flex flex-col gap-5 py-5 max-md:px-6">
      <ProfileHeader />
      <DashboardStats />
      <UpgradePremium />
      <ActivitySummary />
      <AchievementsGrid />
    </div>
  )
}

export default profile
