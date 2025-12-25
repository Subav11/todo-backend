import todoModel from "../models/todoModel.js";

const addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.user.userId;
    if (!task || task.trim() === "") {
      return res.status(400).json({ message: "Task cannot be empty" });
    }
    const result = await todoModel.create({ task, userId });
    res.status(201).json({ message: "Todo added successfully", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Adding todo failed" });
  }
};

const showTodo = async (req, res) => {
  try {
    const id = req.params.userId;
    const { status = "", page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;
    const query = { userId: id, status: { $regex: status, $options: "i" } };
    const totalCount = await todoModel.countDocuments(query);
    const totalPage = Math.ceil(totalCount / limit);
    const result = await todoModel.find(query).skip(skip).limit(Number(limit));
    res.status(200).json({ todo: result, totalPage, totalCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const {task, status } = req.body;
    const update = { task, status };
    const id = req.params.todoId;
    const result = await todoModel.findByIdAndUpdate(id, update, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo updated", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Todo not updated" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.todoId;
    const result = await todoModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted", deletedTodo: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Couldn't delete the task" });
  }
};

export { addTodo, showTodo, updateTodo, deleteTodo };
