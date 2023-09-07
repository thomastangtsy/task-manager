import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categories } from "../models/category";
import { InitialTask } from "../models/task";
import Button from "./Button";

import "./TaskForm.css";

interface TaskFormProps {
  addTask: (task: InitialTask) => void;
}

const taskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  dueDate: z
    .date()
    .min(new Date(), { message: "should not be in the past" })
    .default(new Date()),
  category: z.enum(categories),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

const TaskForm: FC<TaskFormProps> = ({ addTask }) => {
  const { register, handleSubmit } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
  });

  const onSubmit = handleSubmit((data) => {
    addTask(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Title</span>
        <input {...register("title")} type="text" />
      </label>
      <label>
        <span>Due date</span>
        <input {...register("dueDate")} type="date" />
      </label>
      <label>
        <span>Category</span>
        <select {...register("category")}>
          {categories.map((cat) => (
            <option value={cat}>{cat}</option>
          ))}
        </select>
      </label>
      <div className="flex justify-end">
        <Button>
          <p>Add</p>
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
