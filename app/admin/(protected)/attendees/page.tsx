import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminAttendeesPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Attendees</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Attendees</CardTitle>
          <CardDescription>Manage your event attendees.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Attendee management features will be implemented in a future phase.</p>
        </CardContent>
      </Card>
    </>
  )
}
