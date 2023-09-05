import Category from "./category";

interface Task {
  id: number;
  title: string;
  dueDate: Date;
  category: Category;
}

export default Task;
