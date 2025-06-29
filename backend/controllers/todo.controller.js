import ToDo from "../models/todo.model.js";

export const getTodos = async (req, res) => {
  const userId = req.user._id;
  const { mode } = req.params;
  let fetchQuery = {
    user: userId,
  };
  if (mode === "completed") fetchQuery = { ...fetchQuery, completed: true };
  if (mode === "important") fetchQuery = { ...fetchQuery, priority: "high" };
  if (mode === "pending") fetchQuery = { ...fetchQuery, completed: false };

  try {
    const todos = await ToDo.find(fetchQuery);
    if (todos.length === 0)
      return res
        .status(200)
        .json({ message: "No todo found for user", data: [] });

    res.status(200).json({ message: "todos found successfully", data: todos });
  } catch (error) {
    console.error(`Error getting todos: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const postTodo = async (req, res) => {
  const userId = req.user._id;
  const { heading, description, dueDate, priority } = req.body;
  if (!heading || !description || !dueDate)
    return res.status(400).json({ error: "fields cannot be null" });
  try {
    const todo = await ToDo({
      user: userId,
      heading,
      description,
      dueDate,
      priority: priority || "medium",
    });

    if (!todo)
      return res.status(500).json({ error: "could not add todo to db" });

    await todo.save();

    return res
      .status(200)
      .json({ message: "todo created successfully", data: todo });
  } catch (error) {
    console.error(`Error posting todo: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  console.log(id);
  if (!id) return res.status(400).json({ error: "id cannot be undefined" });

  try {
    const deletedTodo = await ToDo.findByIdAndDelete(id);
    if (!deletedTodo)
      return res.status(500).json({ error: "Failed deleting todo" });

    return res
      .status(200)
      .json({ message: "Deleted todo successfully", data: deletedTodo });
  } catch (error) {
    console.error(`Error deleting todo: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const { heading, description, dueDate, priority, completed } = req.body;
  try {
    const todo = await ToDo.findById(id);

    todo.heading = heading || todo.heading;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.priority = priority || todo.priority;
    todo.completed = completed || todo.completed; //completed doesn't get reverted back to false if checked again

    const updatedTodo = await todo.save();

    return res
      .status(200)
      .json({ message: "todo updated successfully", data: updatedTodo });
  } catch (error) {
    console.error(`Error updating todo: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};
