import express from "express";
import Todo from "../models/todos.js";

const router = express.Router();

router.get("/todos/:userId", async (req, res) => {
    const userId = req.params.userId;
    const todoId = req.query.id;

    try {
        if (todoId) {
            const todo = await Todo.findOne({ userId: userId, _id: todoId });
            if (!todo) {
                return res.status(404).send("Todo item not found");
            }
            res.status(200).json(todo);
        } else {
            const todos = await Todo.find({ userId: userId });
            res.status(200).json(todos);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/todos/:userId", async (req, res) => {
    const userId = req.params.userId;
    const todoData = req.body;

    const newTodo = new Todo({
        userId: userId, 
        title: todoData.title,
        description: todoData.description
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put("/todos/:userId/:todoId", async (req, res) => {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const updatedTodoData = req.body;

    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { userId: userId, _id: todoId },
            updatedTodoData,
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).send("Todo item not found");
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete("/todos/:todoId", async (req, res) => {
    const todoId = req.params.todoId;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).send("Todo item not found");
        }
        res.status(200).send("Todo item deleted successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
