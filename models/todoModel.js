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

// Write Utility to Update File
function writeToFile(todoList) {
    fs.writeFileSync("todolist.json", JSON.stringify(todoList))
}

module.exports = { getTodoData, addTodoData }