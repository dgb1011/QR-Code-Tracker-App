"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleLogout} className="mt-auto">
      <LogOut className="h-5 w-5" />
      <span className="sr-only">Logout</span>
    </Button>
  )
}
