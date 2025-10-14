import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AdminEventsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Events</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>Manage your events.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Multi-event management will be implemented in a future phase.</p>
        </CardContent>
      </Card>
    </>
  )
}
