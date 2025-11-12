import { Header } from "@/components/layout/Header";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";
import { useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingEvents = [
    { id: 1, title: "Team Standup", time: "09:00 AM", date: "Today" },
    { id: 2, title: "Project Review", time: "02:00 PM", date: "Today" },
    { id: 3, title: "Client Meeting", time: "10:30 AM", date: "Tomorrow" },
    { id: 4, title: "Design Workshop", time: "03:00 PM", date: "Friday" },
  ];

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="pt-32 sm:pt-28 pb-24 sm:pb-16 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-fade-in glass p-6 rounded-3xl">
            <h1 className="text-3xl font-light mb-2">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and events</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative">
              <div className="relative rounded-3xl border-[0.75px] border p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <Card className="glass border-0 rounded-2xl relative">
                  <CardContent className="p-6">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-2xl"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative rounded-3xl border-[0.75px] border p-2">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <Card className="glass border-0 rounded-2xl relative">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-accent" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 rounded-2xl bg-background/50 hover:bg-background/70 transition-smooth"
                      >
                        <h4 className="font-medium mb-1">{event.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                          <span>•</span>
                          <span>{event.date}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
