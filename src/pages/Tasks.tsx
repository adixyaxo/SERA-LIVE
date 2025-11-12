"use client";

import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Review project proposal", completed: false, priority: "high", category: "Work" },
  { id: 2, title: "Update task documentation", completed: false, priority: "medium", category: "Work" },
  { id: 3, title: "Schedule team meeting", completed: true, priority: "low", category: "Work" },
  { id: 4, title: "Prepare presentation slides", completed: false, priority: "high", category: "Work" },
  { id: 5, title: "Grocery shopping", completed: false, priority: "low", category: "Personal" },
  { id: 6, title: "Gym workout", completed: true, priority: "medium", category: "Personal" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Math.max(...tasks.map(t => t.id), 0) + 1,
          title: newTask,
          completed: false,
          priority: "medium",
          category: "Work",
        },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Header />

      <main className="pt-28 sm:pt-24 pb-20 sm:pb-16 px-4 sm:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Title Section */}
          <div className="animate-fade-in glass p-4 sm:p-6 rounded-3xl text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-light mb-2">Tasks</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your tasks and to-dos</p>
          </div>

          {/* Task Card */}
          <div className="relative rounded-3xl border-[0.75px] border-border p-1 sm:p-2">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3} />
            <Card className="glass border-0 rounded-2xl relative">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <CardTitle className="flex items-center gap-3 justify-center sm:justify-start">
                    <CheckSquare className="h-5 w-5 text-accent" />
                    <span>All Tasks</span>
                  </CardTitle>

                  <div className="flex justify-center sm:justify-end flex-wrap gap-2">
                    <Button
                      variant={filter === "all" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilter("all")}
                      className="rounded-full"
                    >
                      All
                    </Button>
                    <Button
                      variant={filter === "active" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilter("active")}
                      className="rounded-full"
                    >
                      Active
                    </Button>
                    <Button
                      variant={filter === "completed" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilter("completed")}
                      className="rounded-full"
                    >
                      Completed
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Add Task Input */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    className="rounded-2xl flex-1"
                  />
                  <Button onClick={addTask} className="rounded-full flex-shrink-0">
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>

                {/* Task List */}
                <div className="space-y-2">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl hover:bg-background/50 transition-smooth group"
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="rounded-md"
                      />

                      <div className="flex-1">
                        <p
                          className={cn(
                            "text-sm sm:text-base font-medium",
                            task.completed && "line-through text-muted-foreground"
                          )}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm">
                          <span className={cn(getPriorityColor(task.priority))}>{task.priority}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{task.category}</span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>
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

export default Tasks;
