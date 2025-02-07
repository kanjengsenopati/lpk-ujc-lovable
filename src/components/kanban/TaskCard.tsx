
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveRight, Calendar, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "./types";

interface TaskCardProps {
  task: Task;
  onMove: (columnId: string) => void;
}

export function TaskCard({ task, onMove }: TaskCardProps) {
  const priorityColors = {
    low: "bg-blue-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  return (
    <Card className="bg-background hover:shadow-md transition-shadow">
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          {task.title}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoveRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onMove("todo")}>
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMove("in-progress")}>
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMove("done")}>
                Done
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {task.description && (
          <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          {task.assignee && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {task.assignee}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
