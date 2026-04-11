import { User } from "@/types/User"

function DashboardHeader({ user }: User) {
  return (
    <header>
      <h1 className="mb-2 text-2xl">Welcome back, {user.email}!</h1>
      <p>Upload documents to generate Al-powered summaries</p>
    </header>
  )
}

export default DashboardHeader
