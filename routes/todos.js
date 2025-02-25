const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos");

router.get("/", todosController.getTodo);
router.post("/createTodo", todosController.createTodo);
router.put("/markComplete", todosController.markComplete);
router.put("/markIncomplete", todosController.markIncomplete);
router.put("/editTodo", todosController.editTodo);
router.delete("/deleteTodo", todosController.deleteTodo);

module.exports = router;
