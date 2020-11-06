// let todoLists = require("../todolist.json")
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Read file
var todoLists = fs.readFileSync("todolist.json")
try {
    todoLists = JSON.parse(todoLists)
} catch (error) {
    todoLists = ""
}

// GET all Todo Lists
function getTodoListData(status) {
    return new Promise((resolve, reject) => {
        if (!todoLists) reject("Todo Lists do not exist.")
        // GET data by Status
        if (status) {
            let dataByStatus = []
            for (const values of Object.values(todoLists)) {
                let data = values.filter(v => v.status == status)
                if (data.length > 0) {
                    for (let d of data) dataByStatus.push(d)
                }
            }
            if (dataByStatus.length < 1) reject("Data does not exist with the given Status.")
            return resolve(dataByStatus)
        }
        resolve(todoLists)
    })
}

// GET Todo List by ID
function getTodoListByIdData(tlid, status) {
    return new Promise((resolve, reject) => {
        if (!todoLists) reject("Todo Lists do not exist.")
        if (!todoLists[tlid]) reject("Todo List does not exist.")
        if (status) {
            let todoList = todoLists[tlid].filter(t => t.status == status)
            if (todoList.length < 1) reject("Data does not exist with the given Status.")
            resolve(todoList)
        }
        resolve(todoLists[tlid])
    })
}

// GET Task by ID
function getTaskByIdData(tlid, tdid, status) {
    return new Promise((resolve, reject) => {
        if (!todoLists) reject("Todo Lists do not exist.")
        if (!todoLists[tlid]) reject("Todo List does not exist.")
        let taskFound = ""
        for (let task of todoLists[tlid]) {
            if (status) {
                if (task.id == tdid && task.status == status)
                    taskFound = { ...task }
            }
            else if (task.id == tdid)
                taskFound = { ...task }
        }
        if (!taskFound) reject("Task not Found.")
        resolve(taskFound)
    })
}

// Add new Todo List
function addTodoListData(newTodoList) {
    return new Promise((resolve, reject) => {
        if (!todoLists) todoLists = {} // Create new list in case it is empty
        const id = uuidv4()
        todoLists[id] = newTodoList
        writeToFile(todoLists)
        resolve(todoLists)
    })
}
// Add new Task to the specified todolist
function addTodoData(tlid, newTask) {
    return new Promise((resolve, reject) => {
        if (!todoLists) reject("Todo Lists do not exist.")
        if (!todoLists[tlid]) reject("Todo List does not exist.")
        let index = todoLists[tlid].findIndex(t => t.task == newTask.task) //if task already exists
        if (index != -1) reject("Task already exists in todolist.")
        todoLists[tlid].push(newTask)
        writeToFile(todoLists)
        resolve(todoLists)
    })
}

// Update task based on given ID
function modifyTodoData(tlid, tdid, task, status) {
    return new Promise((resolve, reject) => {
        // Search
        if (!todoLists) reject("Todo Lists do not exist.")
        if (!todoLists[tlid]) reject("Todo List does not exist.")
        let index = todoLists[tlid].findIndex(t => t.id == tdid)
        if (index == -1) reject("Task does not exist.") //if task does not exist in the todolist
        // Update task
        task = task || todoLists[tlid][index].task
        status = status || todoLists[tlid][index].status
        let newTask = { id: tdid, task, status }
        todoLists[tlid][index] = newTask
        writeToFile(todoLists)
        resolve(todoLists)
    })
}

// Remove Todo List
function removeTodoListData(tlid, status) {
    return new Promise((resolve, reject) => {
        // Search
        if (!todoLists) reject("Todo Lists do not exist.")
        if (!todoLists[tlid]) reject("Todo List does not exist.")
        // Check for Delete by Status
        if (status) {
             todoLists[tlid] = todoLists[tlid].filter(t => t.status != status)
            writeToFile(todoLists)
            return resolve(todoLists)
        }
        // Delete
        delete todoLists[tlid]
        writeToFile(todoLists)
        resolve(todoLists)
    })
}

// Remove task based on given ID
function removeTaskByIdData(tlid, tdid) {
    return new Promise((resolve, reject) => {
        // Search
        if (!todoLists) reject("Todo Lists do not exist.")
        if (!todoLists[tlid]) reject("Todo List does not exist.")
        let index = todoLists[tlid].findIndex(t => t.id == tdid)
        if (index == -1) reject("Task does not exist.")
        // Delete
        todoLists[tlid].splice(index, 1)
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
    modifyTodoData,
    removeTodoListData, removeTaskByIdData
}