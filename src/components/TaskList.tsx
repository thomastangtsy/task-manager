import { FC } from "react";
import { Task } from "../models/task";
import Button from "./Button";
import Pill from "./Pill";

interface TaskListProps {
  removeTask: (id: number) => void;
  tasks: Array<Task>;
}

const TaskList: FC<TaskListProps> = ({ removeTask, tasks }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-neutral-600">
          <th className="py-2 w-auto text-start">Task</th>
          <th className="py-2 px-2 w-1 whitespace-nowrap text-center">
            Due date
          </th>
          <th className="py-2 w-1 whitespace-no-wrap"></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task.id}
            className="border-b border-neutral-600 last:border-0"
          >
            <td className="py-2 w-auto text-start">
              <span className="mr-2">
                <Pill>{task.category}</Pill>
              </span>
              {task.title}
            </td>
            <td className="py-2 px-4 w-1 whitespace-nowrap text-center">
              {new Date(task.dueDate).toLocaleDateString()}
            </td>
            <td className="py-2 w-1 whitespace-no-wrap">
              <Button
                onClick={() => {
                  removeTask(task.id);
                }}
              >
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
