import { useState } from "react";
import Task from "../models/task";
const useTasks = (initTasks?: Array<Task>) => {
  const [tasks, setTasks] = useState<Array<Task>>(initTasks ?? []);

  const addTask = (task: Omit<Task, "id">): Task => {
    const newTask: Task = { id: Date.now(), ...task };
    setTasks((prev) => {
      const newTasks = prev.concat([newTask]);
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
