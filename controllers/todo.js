const Todo = require("../models/todo");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getTodoList = asyncHandler(async (req, res, next) => {
   const todoList = await Todo.find();
   res.status(200).json({
      success: true,
      length: todoList.length,
      data: todoList,
   });
});

exports.createTodo = asyncHandler(async (req, res, next) => {
   const newTodo = await Todo.create({ title: req.body.title });
   res.status(201).json({
      message: "Succesfully created new todo",
      todo: newTodo,
      success: true,
   });
});

exports.deleteTodoList = asyncHandler(async (req, res, next) => {
   await Todo.deleteMany();
   res.status(200).json({
      message: "Successfully deleted all todo on list",
      success: true,
   });
});

exports.deleteTodo = asyncHandler(async (req, res, next) => {
   const todo = await Todo.findById(req.params.id);

   if (!todo) {
      const message = `No todo with an id of ${req.params.id}`;
      return next(new ErrorResponse(message, 404));
   }

   await todo.remove();

   res.status(200).json({
      message: `Successfully deleted`,
      success: true,
      data: {},
   });
});

exports.updateTodo = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   let todo = await Todo.findById(id);

   if (!todo) {
      const message = `No todo with an id of ${id}`;
      return next(new ErrorResponse(message, 404));
   }

   todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

   todo.save();

   res.status(200).json({
      message: `Successfully updated`,
      success: true,
      data: todo,
   });
});