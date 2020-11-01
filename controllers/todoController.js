const { getTodoData, addTodoData, updateTodoData } = require("../models/todoModel")
const { v4: uuidv4 } = require("uuid")

// GET all todos
async function getTodos() {
    let todoList = await getTodoData()
    if (!todoList) return { error: "Data not found" }
    return { todoList }
}

// GET task by ID
async function getTodoByID(id) {
    let todoList = await getTodoData()
    if (!todoList) return { error: "Data not found" }
    let task = todoList.find(t => t.id == id)
    if (!task) return { error: "Data not found" }
    return { task }
}

// Add new Task
async function addNewTodo(newTask) {
    const id = uuidv4()
    newTask = { id, ...newTask }
    let todoList = await addTodoData(newTask)
    if (!todoList) return { error: "Data not found" }
    return { todoList }
}

// Update a task
async function updateTodo(id, newTask) {
    // Search
    let getTodoByIDResult = await getTodoByID(id)
    if (getTodoByIDResult.error) return getTodoByIDResult

    // Update
    let existingTask = getTodoByIDResult.task
    let { task, status } = newTask
    newTask = {
        id,
        task: task || existingTask.task,
        status: status || existingTask.status
    }
    let updatedTodoList = await updateTodoData(newTask)
    if (!updatedTodoList) return ({ error: "Cannot Update Data." }, { status: 500 })
    return { updatedTodoList }
}

module.exports = { getTodos, getTodoByID, addNewTodo, updateTodo }