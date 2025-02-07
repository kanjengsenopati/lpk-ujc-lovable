
import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Task, Column } from "./types";

export function KanbanBoard() {
  const { toast } = useToast();
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "To Do", tasks: [] },
    { id: "in-progress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ]);

  const handleAddTask = (columnId: string, task: Task) => {
    setColumns(columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, task]
        };
      }
      return column;
    }));

    toast({
      title: "Task added",
      description: "The task has been added successfully."
    });
  };

  const handleMoveTask = (taskId: string, fromColumn: string, toColumn: string) => {
    const task = columns.find(col => col.id === fromColumn)?.tasks.find(t => t.id === taskId);
    if (!task) return;

    setColumns(columns.map(column => {
      if (column.id === fromColumn) {
        return {
          ...column,
          tasks: column.tasks.filter(t => t.id !== taskId)
        };
      }
      if (column.id === toColumn) {
        return {
          ...column,
          tasks: [...column.tasks, task]
        };
      }
      return column;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddTask={handleAddTask}
            onMoveTask={handleMoveTask}
          />
        ))}
      </div>
    </div>
  );
}
