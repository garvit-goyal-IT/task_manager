import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user?.id;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized access" });

    const task = await Task.create({
      title,
      completed: false,
      user: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { tasks: task._id },
    });

    const populatedTask = await Task.findById(task._id).populate("user", "name email");

    return res.status(201).json({
      message: "Task created successfully",
      task: populatedTask,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized access" });

    const user = await User.findById(userId).populate({
      path: "tasks",
      populate: {
        path: "user",
        select: "name email",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: user.tasks,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user?.id;

    if (!taskId) return res.status(400).json({ message: "Enter task to delete" });
    if (!userId) return res.status(401).json({ message: "Unauthorized access" });

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { tasks: task._id },
    });

    return res.status(200).json({
      message: "Task deleted",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, completed } = req.body;
    const userId = req.user?.id;

    if (!taskId) return res.status(400).json({ message: "Task id is required" });
    if (!userId) return res.status(401).json({ message: "Unauthorized access" });

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (completed !== undefined) updatedFields.completed = completed;

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updatedFields,
      { new: true }
    ).populate("user", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated",
      task,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};