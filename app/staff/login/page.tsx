import { StaffLoginForm } from '@/components/auth/staff/staff-login-form'

export default function StaffLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Staff Portal
          </h1>
          <p className="text-muted-foreground">
            Quick check-in for events
          </p>
        </div>
        <StaffLoginForm />
      </div>
    </div>
  )
}

