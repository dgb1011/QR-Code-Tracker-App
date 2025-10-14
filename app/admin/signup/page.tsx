import { AdminSignupForm } from '@/components/auth/admin/admin-signup-form'

export default function AdminSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            QR Check-in
          </h1>
          <p className="text-muted-foreground">
            Create your admin account
          </p>
        </div>
        <AdminSignupForm />
      </div>
    </div>
  )
}

