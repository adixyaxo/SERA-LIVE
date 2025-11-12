import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Zap, Plus, Clock, Mail, Calendar, BellRing } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface Automation {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  icon: any;
  trigger: string;
  action: string;
}

const initialAutomations: Automation[] = [
  {
    id: 1,
    name: "Morning Routine",
    description: "Automatically sets focus mode at 9 AM every weekday",
    enabled: true,
    icon: Clock,
    trigger: "Every weekday at 9:00 AM",
    action: "Enable focus mode"
  },
  {
    id: 2,
    name: "Task Reminders",
    description: "Sends email notifications for upcoming tasks",
    enabled: true,
    icon: Mail,
    trigger: "30 minutes before task",
    action: "Send email reminder"
  },
  {
    id: 3,
    name: "Calendar Sync",
    description: "Syncs calendar events to tasks list automatically",
    enabled: false,
    icon: Calendar,
    trigger: "New calendar event",
    action: "Create task"
  },
  {
    id: 4,
    name: "Daily Summary",
    description: "Sends a daily summary of completed tasks",
    enabled: true,
    icon: BellRing,
    trigger: "Every day at 6:00 PM",
    action: "Send notification"
  },
];

const Automations = () => {
  const [automations, setAutomations] = useState(initialAutomations);

  const toggleAutomation = (id: number) => {
    setAutomations(automations.map(auto =>
      auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
    ));
    const automation = automations.find(a => a.id === id);
    toast.success(`${automation?.name} ${automation?.enabled ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className="min-h-screen w-full">
      <Header />

      <main className="pt-32 sm:pt-28 pb-24 sm:pb-16 px-6 sm:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* === Header Section === */}
          <div className="animate-fade-in glass p-6 rounded-3xl flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-light mb-2">Automations</h1>
              <p className="text-muted-foreground">Automate your workflow and save time</p>
            </div>

            {/* ✅ Responsive Button */}
            <Button className="rounded-full flex items-center justify-center gap-2 sm:px-5 px-3 sm:py-2 py-2 transition-all">
              {/* Show only icon on mobile */}
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">New Automation</span>
            </Button>
          </div>

          {/* === Automation Cards === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automations.map((automation) => {
              const Icon = automation.icon;
              return (
                <div key={automation.id} className="relative rounded-3xl border-[0.75px] border-border p-2">
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
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-accent/10">
                            <Icon className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <CardTitle>{automation.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {automation.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Switch
                          checked={automation.enabled}
                          onCheckedChange={() => toggleAutomation(automation.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 rounded-2xl bg-background/50">
                          <p className="text-xs text-muted-foreground mb-1">Trigger</p>
                          <p className="text-sm">{automation.trigger}</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-background/50">
                          <p className="text-xs text-muted-foreground mb-1">Action</p>
                          <p className="text-sm">{automation.action}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* === Quick Automations Section === */}
          <div className="relative rounded-3xl border-[0.75px] border-border p-2">
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
                  Quick Automations
                </CardTitle>
                <CardDescription>
                  Common automation templates to get you started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Email to Task", "Calendar Sync", "Smart Scheduling"].map((template, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="h-auto py-6 rounded-2xl hover:bg-accent/10 transition-smooth"
                    >
                      <div className="text-center">
                        <p className="font-medium">{template}</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to add</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Automations;
