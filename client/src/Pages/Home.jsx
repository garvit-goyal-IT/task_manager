import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskForm from "../components/Taskform.jsx";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/task");
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TaskForm onTaskAdded={fetchTasks} />
        <TaskList tasks={tasks} onTaskChange={fetchTasks} />
      </div>
    </div>
  );
};

export default Home;