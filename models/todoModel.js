const todoList = require("../todolist.json")
const fs = require("fs");

// GET all todos
function getTodoData() {
    return new Promise((resolve, reject) => resolve(todoList))
}
// Add new Task
function addTodoData(newTask) {
    return new Promise((resolve, reject) => {
        todoList.push(newTask)
        writeToFile(todoList)
        resolve(todoList)
    })
}

// Update task based on given ID
function updateTodoData(newTask) {
    return new Promise((resolve, reject) => {
        let index = todoList.findIndex(t => t.id == newTask.id)
        todoList[index] = newTask
        writeToFile(todoList)
        resolve(todoList)
    })
}

// Write Utility to Update File
function writeToFile(todoList) {
    fs.writeFileSync("todolist.json", JSON.stringify(todoList))
}

module.exports = { getTodoData, addTodoData, updateTodoData }