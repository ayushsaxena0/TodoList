const Todo = require("../models/Todo");

module.exports = {
  getTodo: async (req, res) => {
    try {
      const todoItems = await Todo.find();
      const itemsLeft = await Todo.countDocuments({ completed: false });

      res.render("todos.ejs", { todos: todoItems, left: itemsLeft });
    } catch (err) {
      console.error(err);
    }
  },
  createTodo: async (req, res) => {
    try {
      await Todo.create({ todo: req.body.todoItem, completed: false });
      console.log("Todo Added");
      res.redirect("/todos");
    } catch (error) {
      console.error(error);
    }
  },
  markComplete: async (req, res) => {
    try {
      const data = await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJs },
        {
          completed: true,
        }
      );
      console.log(data);
      console.log("Marked Completed");
      res.json("Marked Completed");
    } catch (err) {
      console.error(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJs },
        {
          completed: false,
        }
      );
      console.log("Marked Incompleted");
      res.json("Marked Incompleted");
    } catch (err) {
      console.error(err);
    }
  },
  deleteTodo: async (req, res) => {
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJs });
      console.log("Todo Deleted");
      res.json("Todo Deleted");
    } catch (err) {
      console.error(err);
    }
  },
};
