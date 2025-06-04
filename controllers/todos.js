const Todo = require("../models/Todo");

module.exports = {
  getTodo: async (req, res) => {
    console.log(req.user);
    try {
      const todoItems = await Todo.find({ userId: req.user.id }).sort({priority: 1});
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });

      res.render("todos.ejs", {
        todos: todoItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.error(err);
    }
  },
  createTodo: async (req, res) => {
    try {
      await Todo.create({
        todo: req.body.todoItem,
        priority: req.body?.priority ? req.body.priority : 2,
        completed: false,
        userId: req.user.id,
      });
      console.log("Todo Added");
      res.redirect("/todos");
    } catch (error) {
      console.error(error);
    }
  },

  todoComplete: async (req, res) => {
    try {
      const bool = req.params.completed === 'true' ? false : true;
      const data = await Todo.findOneAndUpdate({ _id: req.params.id }, {completed: bool});
      console.log(`Todo marked ${data.completed ? 'completed' : 'incomplete'}`);
      res.redirect('/todos');
    } catch (error) {
      console.log('Todo Complete Error:', error);
    }
  },

  deleteTodo: async (req, res) => {
    try {
      await Todo.findOneAndDelete({ _id: req.params.id });
      console.log("Todo Deleted");
      res.redirect('/todos');
    } catch (err) {
      console.error(err);
    }
  },
  editTodo: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.params.id },
        {
          todo: req.body.todoItem,
          priority: req.body.priority,
          completed: false,
        }
      );
      console.log("Todo Updated");
      res.redirect('/todos');
    } catch (err) {
      console.error(err);
    }
  },
};
