import express from "express";
import authenticate from "../middlewares/auth.js";
import { addTodo, showTodo, updateTodo, deleteTodo } from "../controllers/todoController.js";

const Router = express.Router();

Router.post("/",authenticate, addTodo);
Router.get("/:userId",authenticate, showTodo);
Router.patch("/:todoId",authenticate, updateTodo);
Router.delete("/:todoId",authenticate, deleteTodo);

export default Router;
