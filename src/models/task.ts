import Category from "./category";

export interface Task {
  id: number;
  title: string;
  dueDate: Date;
  category: Category;
}

export type InitialTask = Omit<Task, "id">;
