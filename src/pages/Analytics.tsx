import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Clock, CheckCircle2, Target, Zap } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Analytics = () => {
  const stats = [
    { name: "Tasks Completed", value: "47", change: "+12%", icon: CheckCircle2, color: "text-green-500" },
    { name: "Focus Time", value: "28h", change: "+5h", icon: Clock, color: "text-blue-500" },
    { name: "Productivity", value: "87%", change: "+3%", icon: TrendingUp, color: "text-accent" },
    { name: "Goals Achieved", value: "12/15", change: "80%", icon: Target, color: "text-purple-500" },
  ];

  const weeklyData = [
    { day: "Mon", tasks: 8, focus: 4 },
    { day: "Tue", tasks: 6, focus: 5 },
    { day: "Wed", tasks: 10, focus: 6 },
    { day: "Thu", tasks: 7, focus: 4 },
    { day: "Fri", tasks: 9, focus: 5 },
    { day: "Sat", tasks: 4, focus: 2 },
    { day: "Sun", tasks: 3, focus: 2 },
  ];

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="pt-32 sm:pt-28 pb-24 sm:pb-16 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-fade-in glass p-6 rounded-3xl">
            <h1 className="text-3xl font-light mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track your productivity and insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="relative rounded-3xl border-[0.75px] border p-2">
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
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-background/50 ${stat.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm text-accent font-medium">{stat.change}</span>
                      </div>
                      <p className="text-3xl font-light mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.name}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <BarChart3 className="h-5 w-5 text-accent" />
                    Weekly Overview
                  </CardTitle>
                  <CardDescription>Your activity for the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((day, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{day.day}</span>
                          <span>{day.tasks} tasks</span>
                        </div>
                        <div className="h-2 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{ width: `${(day.tasks / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

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
                    <Zap className="h-5 w-5 text-accent" />
                    Focus Sessions
                  </CardTitle>
                  <CardDescription>Deep work time this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyData.map((day, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{day.day}</span>
                          <span>{day.focus}h focus</span>
                        </div>
                        <div className="h-2 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${(day.focus / 6) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

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
                <CardTitle>Productivity Insights</CardTitle>
                <CardDescription>AI-powered recommendations based on your activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-2xl bg-background/50">
                  <h4 className="font-medium mb-2">🎯 Peak Performance Window</h4>
                  <p className="text-sm text-muted-foreground">
                    You're most productive between 9 AM - 12 PM. Consider scheduling important tasks during this time.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-background/50">
                  <h4 className="font-medium mb-2">⚡ Focus Streak</h4>
                  <p className="text-sm text-muted-foreground">
                    You've completed 5 consecutive days of focus sessions! Keep up the momentum.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-background/50">
                  <h4 className="font-medium mb-2">📈 Task Completion Rate</h4>
                  <p className="text-sm text-muted-foreground">
                    Your task completion rate increased by 12% this week. Great improvement!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
