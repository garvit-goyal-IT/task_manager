import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onTaskChange }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 py-10 bg-gray-800 rounded-2xl">
          No tasks found
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} onTaskChange={onTaskChange} />
        ))
      )}
    </div>
  );
};

export default TaskList;