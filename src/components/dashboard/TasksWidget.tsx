import { CheckSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const initialTasks = [
  { id: 1, title: "Review project proposal", completed: false },
  { id: 2, title: "Update task documentation", completed: false },
  { id: 3, title: "Schedule team meeting", completed: true },
  { id: 4, title: "Prepare presentation slides", completed: false },
];

export const TasksWidget = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Math.max(...tasks.map(t => t.id), 0) + 1, 
        title: newTask, 
        completed: false 
      }]);
      setNewTask("");
      setIsAdding(false);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="glass rounded-3xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CheckSquare className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-medium">Tasks</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-accent/10 transition-smooth"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-3">
        {isAdding && (
          <div className="flex gap-2 mb-3">
            <Input
              placeholder="New task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="rounded-2xl"
              autoFocus
            />
            <Button
              size="sm"
              onClick={addTask}
              className="rounded-full"
            >
              Add
            </Button>
          </div>
        )}
        
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-background/50 transition-smooth group"
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="rounded-md data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            <span
              className={cn(
                "text-sm flex-1",
                task.completed && "text-muted-foreground line-through"
              )}
            >
              {task.title}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive/10 hover:text-destructive"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
