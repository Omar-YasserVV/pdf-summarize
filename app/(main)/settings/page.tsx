"use client";

import React, { useState } from 'react'
import SettingsHeader from './components/SettingsHeader'
import ProfileSettings from './components/ProfileSettings'
import DangerZone from './components/DangerZone'
import SettingsProfileTaps from './components/SettingsProfileTaps'
import SecuritySettings from './components/SecuritySettings'
import ProfileDashboardStats from './components/ProfileDashboardStats'

function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="flex flex-col gap-5 py-5 max-sm:px-3">
      <SettingsHeader />
      
      {/* Tab Selectors */}
      <SettingsProfileTaps activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Conditional rendering of cards */}
      {activeTab === 'profile' && (
        <>
          <ProfileDashboardStats />
          <ProfileSettings />
          <DangerZone />
        </>
      )}

      {activeTab === 'security' && <SecuritySettings />}

      {activeTab === 'billing' && (
        <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-8 text-center text-slate-400 shadow-2xl">
          Billing history and subscription management features are coming soon.
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-8 text-center text-slate-400 shadow-2xl">
          Email and push notification preferences are coming soon.
        </div>
      )}
    </div>
  )
}

export default Settings
