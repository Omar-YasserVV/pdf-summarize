import SettingsHeader from './components/SettingsHeader'
import ProfileSettings from './components/ProfileSettings'
import DangerZone from './components/DangerZone'

function Settings() {
  return (
    <div className="flex flex-col gap-5 py-5 max-sm:px-3">
      <SettingsHeader />
      <ProfileSettings />
      <DangerZone />
    </div>
  )
}
export default Settings
