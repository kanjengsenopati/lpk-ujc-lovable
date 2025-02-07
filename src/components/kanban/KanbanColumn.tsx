
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard } from "./TaskCard";
import type { Column, Task } from "./types";

interface KanbanColumnProps {
  column: Column;
  onAddTask: (columnId: string, task: Task) => void;
  onMoveTask: (taskId: string, fromColumn: string, toColumn: string) => void;
  onEditTask: (taskId: string, columnId: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
}

export function KanbanColumn({ 
  column, 
  onAddTask, 
  onMoveTask,
  onEditTask,
  onDeleteTask 
}: KanbanColumnProps) {
  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          {column.title}
          <span className="text-sm text-muted-foreground">
            {column.tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={(columnId) => onMoveTask(task.id, column.id, columnId)}
            onEdit={() => onEditTask(task.id, column.id)}
            onDelete={() => onDeleteTask(task.id, column.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
