'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function StaffLoginForm() {
  const router = useRouter()
  const [staffCode, setStaffCode] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffCode, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      router.push('/staff/scan')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-purple-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Staff Portal</CardTitle>
        <CardDescription className="text-center">
          Enter your staff code to access the scanner
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="staffCode">Staff Code</Label>
            <Input
              id="staffCode"
              type="text"
              placeholder="ABC1234"
              value={staffCode}
              onChange={(e) => setStaffCode(e.target.value.toUpperCase())}
              required
              className="focus:ring-secondary uppercase"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:ring-secondary"
            />
          </div>
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Access Scanner'}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <p>Contact your admin for staff credentials</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

