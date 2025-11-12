import { Clock } from "lucide-react";

const timelineEvents = [
  { time: "09:00", title: "Morning Review", status: "completed" },
  { time: "10:30", title: "Deep Work Session", status: "active" },
  { time: "12:00", title: "Lunch Break", status: "upcoming" },
  { time: "14:00", title: "Team Sync", status: "upcoming" },
  { time: "16:00", title: "Project Planning", status: "upcoming" },
];

export const TimelineWidget = () => {
  return (
    <div className="glass rounded-3xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-medium">Today's Timeline</h3>
      </div>

      <div className="space-y-4">
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className="flex items-center gap-4 group hover:translate-x-1 transition-smooth"
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full shrink-0",
                event.status === "completed" && "bg-muted",
                event.status === "active" && "bg-accent animate-pulse-soft",
                event.status === "upcoming" && "bg-border"
              )}
            />
            <div className="text-sm text-muted-foreground font-mono w-16">
              {event.time}
            </div>
            <div
              className={cn(
                "flex-1 text-sm",
                event.status === "active" && "text-accent font-medium",
                event.status === "completed" && "text-muted-foreground"
              )}
            >
              {event.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
