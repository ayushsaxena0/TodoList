const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, todosController.getTodo);
router.post("/createTodo", todosController.createTodo);
router.put('/todoCompleted/:id/:completed', todosController.todoComplete)
router.put("/editTodo/:id", todosController.editTodo);
router.delete("/deleteTodo/:id", todosController.deleteTodo);

module.exports = router;
