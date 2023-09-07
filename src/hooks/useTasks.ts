import { useState } from "react";
import { InitialTask, Task } from "../models/task";

const useTasks = (initTasks?: Array<Task>) => {
  const generateTask = (task: InitialTask): Task => {
    return { ...task, id: Date.now() };
  };

  const [tasks, setTasks] = useState<Array<Task>>(
    initTasks?.map((t) => generateTask(t)) ?? [],
  );

  const addTask = (task: InitialTask): Task => {
    const newTask = generateTask(task);
    setTasks((prev) => {
      const newTasks = prev.concat([generateTask(task)]);
      newTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      return newTasks;
    });
    return newTask;
  };

  const removeTask = (id: number): boolean => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    return true;
  };

  return { tasks, addTask, removeTask };
};

export default useTasks;
