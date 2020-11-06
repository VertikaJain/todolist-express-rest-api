const todoModel = require("../models/todoModel")
const { v4: uuidv4 } = require("uuid");

// GET all Todo Lists
async function getTodoLists(req, res) {
    try {
        let todoLists = await todoModel.getTodoListData(req.query.status)
        return res.status(200).send(todoLists)
    } catch (error) {
        return res.status(404).send({ error })
    }
}

// GET Todo List by ID
async function getTodoListByID(req, res) {
    try {
        let todoList = await todoModel.getTodoListByIdData(req.params.tlid, req.query.status)
        return res.status(200).send(todoList)
    } catch (error) {
        return res.status(404).send({ error })

    }
}

// GET Task by ID
async function getTaskByID(req, res) {
    try {
        let task = await todoModel.getTaskByIdData(req.params.tlid, req.params.tdid, req.query.status)
        return res.status(200).send(task)
    } catch (error) {
        return res.status(404).send({ error})
    }

}

// Add New Todo List
async function addTodoList(req, res) {
    // Validate inputs
    if (req.body.length < 1 || !Array.isArray(req.body)) return res.status(400).send({ error: "Invalid Request." })
    let tempList = []
    for (let todoList of req.body) {
        // Validate inputs
        if (!todoList.task || !todoList.status) return res.status(400).send({ error: "Invalid Request." })
        const id = uuidv4()
        // Create new task with unique ID
        let newTask = { id, ...todoList }
        tempList.push(newTask)
    }
    try {
        let newTodoList = await todoModel.addTodoListData(tempList)
        return res.status(201).send(newTodoList)
    } catch (error) {
        return res.status(500).send({ error: "Cannot add Todo List." })
    }

}

// Add new Task to the specified todolist
async function addTask(req, res) {
    // Validate inputs
    if (!req.body.task || !req.body.status) return res.status(400).send({ error: "Invalid Request." })
    let newTask = { id: uuidv4(), task: req.body.task, status: req.body.status }
    try {
        let newTodoList = await todoModel.addTodoData(req.params.tlid, newTask)
        return res.status(201).send(newTodoList)
    } catch (error) {
        return res.status(404).send({ error })
    }
}

// Update a task
async function updateTask(req, res) {
    // Validate Request
    if (!req.body.task && !req.body.status) return res.status(400).send({ error: "Invalid Request." })
    const { tlid, tdid } = req.params
    const { task, status } = req.body
    // Modify
    try {
        let modifiedTodoList = await todoModel.modifyTodoData(tlid, tdid, task, status)
        return res.status(200).send(modifiedTodoList)
    } catch (error) {
        return res.status(400).send({ error: "Cannot update Task. List does not exist." })
    }

}

// Remove Todo List
async function removeTodoList(req, res) {
    let todoList = await todoModel.removeTodoListData(req.params.tlid)
    if (!todoList) return res.status(400).send({ error: "Cannot remove List. List does not exist." })
    return res.status(200).send(todoList)
}

// Remove a task by ID
async function removeTaskById(req, res) {
    let todoList = await todoModel.removeTaskByIdData(req.params.tlid, req.params.tdid)
    if (!todoList) return res.status(400).send({ error: "Cannot remove Task. List does not exist." })
    return res.status(200).send(todoList)
}

// Remove a task by Status
async function removeTaskByStatus(req, res) {
    let todoList = await todoModel.removeStatusByIdData(req.params.tlid, req.query.status)
    if (!todoList) return res.status(400).send({ error: "Cannot remove Task. List does not exist." })
    return res.status(200).send(todoList)
}

module.exports = {
    getTodoLists, getTodoListByID, getTaskByID,
    addTodoList, addTask,
    updateTask,
    removeTodoList, removeTaskById, removeTaskByStatus
}