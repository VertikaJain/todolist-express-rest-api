let todoLists = require("../todolist.json")
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// GET all Todo Lists
function getTodoListData(status) {
    return new Promise((resolve, reject) => {
        if (!todoLists) reject(error)

        // GET data by Status
        if (status) {
            let dataByStatus = []
            for (const values of Object.values(todoLists)) {
                let data = values.filter(v => v.status == status)
                if (data.length > 0) {
                    for (let d of data) dataByStatus.push(d)
                }
            }
            if (dataByStatus.length < 1) reject(error)
            resolve(dataByStatus)
        }
        resolve(todoLists)
    })
}

// GET Todo List by ID
function getTodoListByIdData(tlid, status) {
    return new Promise((resolve, reject) => {
        if (!todoLists[tlid]) reject(error)
        if (status) {
            let todoList = todoLists[tlid].filter(t => t.status == status)
            if (todoList.length < 1) reject(error)
            resolve(todoList)
        }
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
function modifyTodoData(tlid, tdid, task, status) {
    return new Promise((resolve, reject) => {
        // Search
        if (!todoLists[tlid]) resolve() //if todolist does not exist
        let index = todoLists[tlid].findIndex(t => t.id == tdid)
        if (index == -1) resolve() //if task does not exist in the todolist
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
function removeTodoListData(tlid) {
    return new Promise((resolve, reject) => {
        // Search
        if (!todoLists[tlid]) resolve() //if todolist does not exist
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
        if (!todoLists[tlid]) resolve() //if todolist does not exist
        let index = todoLists[tlid].findIndex(t => t.id == tdid)
        if (index == -1) resolve() //if task does not exist in the todolist
        // Delete
        todoLists[tlid].splice(index, 1)
        writeToFile(todoLists)
        resolve(todoLists)
    })
}

// Remove task based on given Status
function removeStatusByIdData(tlid, status) {
    return new Promise((resolve, reject) => {
        // Search
        if (!todoLists[tlid]) resolve() //if todolist does not exist
        let index = todoLists[tlid].findIndex(t => (t.status == status))
        if (index == -1) resolve() //if task does not exist in the todolist
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
    removeTodoListData, removeTaskByIdData, removeStatusByIdData
}