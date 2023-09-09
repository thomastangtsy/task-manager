import { FC, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";
import useTasks from "./hooks/useTasks";
import Button from "./components/Button";
import { InitialTask } from "./models/task";
import TaskList from "./components/TaskList";

const App: FC = () => {
  const { tasks, addTask, removeTask } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);

  const addTaskAndCloseModal = (task: InitialTask) => {
    addTask(task);
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto my-4 px-2">
      <header className="flex">
        <h1 className="text-3xl font-bold mr-auto">Task Manager</h1>
        <Button onClick={() => setModalOpen(true)}>
          <PlusIcon className="w-4 h-4 fill-white" />
          <p className="hidden md:block ml-1">New task</p>
        </Button>
        <Modal isOpen={modalOpen} close={() => setModalOpen(false)}>
          <div className="min-w-[80vw]">
            <h1 className="text-3xl font-bold mb-4">Add a new task</h1>
            <TaskForm addTask={addTaskAndCloseModal}></TaskForm>
          </div>
        </Modal>
      </header>
      <main className="mt-4">
        {tasks.length === 0 ? (
          <div className="w-full mt-24 text-center">
            <p className="text-6xl">🤷</p>
            <p>No task yet</p>
          </div>
        ) : (
          <TaskList tasks={tasks} removeTask={removeTask} />
        )}
      </main>
    </div>
  );
};

export default App;
