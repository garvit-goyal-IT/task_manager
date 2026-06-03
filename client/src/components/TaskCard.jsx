import { useState } from "react";
import api from "../services/api";

const TaskCard = ({ task, onTaskChange }) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleDelete = async () => {
    try {
      await api.delete(`/task/${task._id}`);
      onTaskChange();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/task/${task._id}`, { title: editTitle });
      setEditing(false);
      onTaskChange();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async () => {
    try {
      await api.patch(`/task/${task._id}`, {
        completed: !task.completed,
      });
      onTaskChange();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="w-5 h-5"
        />

        {editing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />
        ) : (
          <span className={task.completed ? "line-through text-gray-400" : ""}>
            {task.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {editing ? (
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-lg bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 rounded-lg bg-yellow-600"
          >
            Edit
          </button>
        )}

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;