// const { getTodoListData, addTodoData, updateTodoData, removeTodoData, removeTodoByStatusData } = require("../models/todoModel")
const todoModel = require("../models/todoModel")
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");

// GET all Todo Lists
async function getTodoLists(req, res) {
    let todoLists = await todoModel.getTodoListData()
    if (!todoLists) return res.status(404).send({ error: "Data Not Found" })

    // GET data by Status
    if (req.query.status) {
        let dataByStatus = []
        for (const values of Object.values(todoLists)) {
            let data = values.filter(v => v.status == req.query.status)
            if (data.length > 0) {
                for (let d of data) dataByStatus.push(d)
            }
        }
        if (dataByStatus.length < 1) return res.status(404).send({ error: "Data Not Found" })
        return res.status(200).send(dataByStatus)
    }

    return res.status(200).send(todoLists)
}

// GET Todo List by ID
async function getTodoListByID(req, res) {
    const tlid = req.params.tlid
    let todoLists = await todoModel.getTodoListData()
    if (!todoLists) return res.status(404).send({ error: "Data Not Found" })
    let todoList = ""
    for (const [key, value] of Object.entries(todoLists)) {
        if (tlid == key) todoList = value
    }
    // GET data by Status
    if (req.query.status) {
        todoList = todoList.filter(t => t.status == req.query.status)
    }
    if (todoList.length < 1) return res.status(404).send({ error: "Data Not Found" })
    return res.status(200).send(todoList)
}

// GET Task by ID
async function getTaskByID(req, res) {
    const { tlid, tdid } = req.params
    let todoLists = await todoModel.getTodoListData()
    if (!todoLists) return res.status(404).send({ error: "Data Not Found" })
    let task = ""
    for (const [key, value] of Object.entries(todoLists)) {
        if (tlid == key) {
            if (req.query.status) // GET data by Status
                task = value.find(t => (t.id == tdid && t.status == req.query.status))
            else
                task = value.find(t => t.id == tdid)
        }
    }
    if (!task) return res.status(404).send({ error: "Data Not Found" })
    return res.status(200).send(task)
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

// Delete a task by ID
async function removeTodo(id) {
    // Search
    let getTodoByIDResult = await getTodoByID(id)
    if (getTodoByIDResult.error) return getTodoByIDResult

    // Delete
    let todoList = await removeTodoData(id)
    if (!todoList) return ({ error: "Cannot Remove Data." }, { status: 500 })
    return { todoList }
}

// Delete a task by Status
async function removeTodoByStatus(status) {
    // Search
    let getTodoByIDResult = await getTodoByStatus(status)
    if (getTodoByIDResult.error) return getTodoByIDResult

    // Delete
    let todoList = await removeTodoByStatusData(status)
    if (!todoList) return ({ error: "Cannot Remove Data." }, { status: 500 })
    return { todoList }
}

module.exports = {
    getTodoLists, getTodoListByID,
    getTaskByID,
    // getTodoByStatus,
    addNewTodo, updateTodo, removeTodo, removeTodoByStatus
}