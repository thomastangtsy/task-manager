import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
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

const applyTimezoneOffset = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
};

const isFutureDate = (date: Date) => {
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  console.debug("Input date", date);
  console.debug("Current date", currentDate);

  return date.getTime() >= currentDate.getTime();
};

const taskFormSchema = z.object({
  title: z.string().min(1, "Required"),
  dueDate: z
    .date({ coerce: true })
    .transform(applyTimezoneOffset)
    .refine(isFutureDate, "Must be in future"),
  category: z.enum(categories),
});
type TaskFormSchema = z.infer<typeof taskFormSchema>;

const TaskForm: FC<TaskFormProps> = ({ addTask }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
  });

  const onSubmit = handleSubmit((data) => {
    addTask(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label className="flex">
          <span>Title</span>
          {errors.title && (
            <span className="flex ml-2 items-center text-red-500">
              <ExclamationCircleIcon className="w-4 h-4" />
              {errors.title?.message}
            </span>
          )}
        </label>
        <input
          {...register("title")}
          className="invalid:border-red-500 invalid:border-2"
          aria-invalid={!!errors.title}
        />
      </div>
      <div className="mb-2">
        <label className="flex">
          <span>Due date</span>
          {errors.dueDate && (
            <span className="flex ml-2 items-center text-red-500">
              <ExclamationCircleIcon className="w-4 h-4" />
              {errors.dueDate?.message}
            </span>
          )}
        </label>
        <input {...register("dueDate")} type="date" />
      </div>
      <div className="mb-2">
        <label className="flex">
          <span>Category</span>
          {errors.category && (
            <span className="flex ml-2 items-center text-red-500">
              <ExclamationCircleIcon className="w-4 h-4" />
              Required
            </span>
          )}
        </label>
        <select {...register("category")} defaultValue="">
          <option value="" disabled></option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <Button>Add</Button>
      </div>
    </form>
  );
};

export default TaskForm;
