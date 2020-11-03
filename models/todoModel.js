let todoLists = require("../todolist.json")
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// GET all Todo Lists
function getTodoListData() {
    return new Promise((resolve, reject) => resolve(todoLists))
}

// GET Todo List by ID
function getTodoListByIdData(tlid) {
    return new Promise((resolve, reject) => {
        if (!todoLists[tlid]) resolve()
        resolve(todoLists[tlid])
    })
}

// GET Task by ID
function getTaskByIdData(tlid, tdid, status) {
    return new Promise((resolve, reject) => {
        if (!todoLists[tlid]) resolve()
        let taskFound = ""
        for (let task of todoLists[tlid]) {
            if (status) {
                if (task.id == tdid && task.status == status)
                    taskFound = { ...task }
            }
            else if (task.id == tdid)
                taskFound = { ...task }
        }
        if (!taskFound) resolve()
        resolve(taskFound)
    })
}

// Add new Todo List
function addTodoListData(newTodoList) {
    return new Promise((resolve, reject) => {
        const id = uuidv4()
        todoLists[id] = newTodoList
        writeToFile(todoLists)
        resolve(todoLists)
    })
}
// Add new Task to the specified todolist
function addTodoData(tlid, newTask) {
    return new Promise((resolve, reject) => {
        if (!todoLists[tlid]) resolve()
        todoLists[tlid].push(newTask)
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
    getTodoListData, getTodoListByIdData, getTaskByIdData,
    addTodoListData, addTodoData,
    updateTodoData, removeTodoData, removeTodoByStatusData
}