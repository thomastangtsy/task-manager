import { ChangeEventHandler, FC, useCallback } from "react";
import Category, { categories } from "../models/category";
import Pill from "./Pill";
import { FunnelIcon } from "@heroicons/react/24/solid";

interface TaskFilterProps {
  category?: Category;
  setCategory: (category: Category | undefined) => void;
}

const TaskFilter: FC<TaskFilterProps> = ({ category, setCategory }) => {
  const changeFilter: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      if (event.currentTarget.value) {
        setCategory(event.currentTarget.value as Category);
      } else {
        setCategory(undefined);
      }
    },
    [setCategory],
  );

  return (
    <div className="w-full flex items-center justify-left">
      <Pill>
        <span className="flex items-center">
          <FunnelIcon className="text-black w-3 h-3" />
          <select
            className="w-min bg-inherit text-center"
            value={category ?? ""}
            onChange={changeFilter}
          >
            <option value=""></option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </span>
      </Pill>
    </div>
  );
};

export default TaskFilter;
