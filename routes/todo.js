const express = require("express");
const router = express.Router();
const {
   getTodoList,
   createTodo,
   deleteTodoList,
   deleteTodo,
   updateTodo,
} = require("../controllers/todo");

router.route("/").get(getTodoList).post(createTodo).delete(deleteTodoList);

router.route("/:id").patch(updateTodo).delete(deleteTodo);

module.exports = router;
