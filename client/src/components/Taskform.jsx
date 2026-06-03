import { useState } from "react";
import api from "../services/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await api.post("/task", { title });
      setTitle("");
      onTaskAdded();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-6 bg-gray-800 p-4 rounded-2xl"
    >
      <input
        type="text"
        placeholder="Enter new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white outline-none"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;