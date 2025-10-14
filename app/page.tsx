import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Users, BarChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center animate-fade-in-down">
        <Link href="#" className="flex items-center justify-center">
          <QrCode className="h-6 w-6 text-primary" />
          <span className="sr-only">QR Event Tracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/admin/login" className="text-sm font-medium hover:underline underline-offset-4">Login</Link>
          <Link href="/admin/signup" className="text-sm font-medium hover:underline underline-offset-4">Sign Up</Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-orange-50 via-white to-purple-50 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in-up">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Seamless Event Check-ins with QR Codes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl animate-fade-in-up animation-delay-200">
                    Ditch the spreadsheets and long lines. Our platform allows you to manage attendees, generate unique QR codes, and scan them for instant check-ins.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in-up animation-delay-400">
                  <Link href="/admin/signup">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="/admin/login">
                    <Button variant="outline" size="lg">Admin Login</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center animate-fade-in animation-delay-600">
                <div className="w-64 h-64 relative animate-float">
                    <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary opacity-30 blur-3xl"></div>
                    <QrCode className="w-full h-full text-primary/80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need for a Smooth Event</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features to make your event check-in process as efficient and painless as possible.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Attendee Management</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Easily import and manage your attendee list. Add, edit, and remove attendees with a few clicks.</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <QrCode className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>QR Code Generation</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Generate unique, secure QR codes for each attendee and deliver them via email automatically.</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <BarChart className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Real-time Dashboard</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Monitor check-ins in real-time with our live dashboard. See who has arrived and who is still pending.</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to streamline your next event?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and experience the future of event check-ins.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/admin/signup">
                    <Button size="lg" className="w-full">Sign Up for Free</Button>
                </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 QR Event Tracker. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">Terms of Service</Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}