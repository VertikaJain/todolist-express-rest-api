const { getTodoData, addTodoData } = require("../models/todoModel")
const { v4: uuidv4 } = require("uuid")

// GET all todos
async function getTodos() {
    let todoList = await getTodoData()
    if (!todoList) return { error: "Data not found" }
    return { todoList }
}

// Add new Task
async function addNewTodo(newTask) {
    const id = uuidv4()
    newTask = { id, ...newTask }
    let todoList = await addTodoData(newTask)
    if (!todoList) return { error: "Data not found" }
    return { todoList }
}

module.exports = { getTodos, addNewTodo }