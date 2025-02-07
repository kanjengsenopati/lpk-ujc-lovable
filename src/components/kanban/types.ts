
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  assignee?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
