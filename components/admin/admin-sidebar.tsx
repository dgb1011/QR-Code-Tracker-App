"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, User, Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { LogoutButton } from "@/components/auth/logout-button"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/attendees", label: "Attendees", icon: Users },
    { href: "/admin/staff", label: "Staff", icon: User },
    { href: "/admin/events", label: "Events", icon: Calendar },
  ]

  return (
    <div className="hidden md:block border-r bg-muted/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="">QR Event Tracker</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}