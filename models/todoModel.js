let todoLists = require("../todolist.json")
const fs = require("fs");

// GET all todos
function getTodoListData() {
    return new Promise((resolve, reject) => resolve(todoLists))
}

// Add new Task
function addTodoData(newTask) {
    return new Promise((resolve, reject) => {
        todoLists.push(newTask)
        writeToFile(todoLists)
        resolve(todoLists)
    })
}

// Update task based on given ID
function updateTodoData(newTask) {
    return new Promise((resolve, reject) => {
        let index = todoLists.findIndex(t => t.id == newTask.id)
        todoLists[index] = newTask
        writeToFile(todoLists)
        resolve(todoLists)
    })
}

// Delete task based on given ID
function removeTodoData(id) {
    return new Promise((resolve, reject) => {
        todoLists = todoLists.filter(t => t.id != id)
        writeToFile(todoLists)
        resolve(todoLists)
    })
}

// Delete task based on given Status
function removeTodoByStatusData(status) {
    return new Promise((resolve, reject) => {
        todoLists = todoLists.filter(t => t.status != status)
        writeToFile(todoLists)
        resolve(todoLists)
    })
}

// Write Utility to Update File
function writeToFile(todoList) {
    fs.writeFileSync("todolist.json", JSON.stringify(todoList))
}

module.exports = { 
    getTodoListData, addTodoData, updateTodoData, removeTodoData, removeTodoByStatusData 
}