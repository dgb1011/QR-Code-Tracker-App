import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminStaffPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Staff</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Staff</CardTitle>
          <CardDescription>Manage your event staff.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Staff management features will be implemented in a future phase.</p>
        </CardContent>
      </Card>
    </>
  )
}
