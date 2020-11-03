const todoModel = require("../models/todoModel")
const { v4: uuidv4 } = require("uuid");

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
    let todoList = await todoModel.getTodoListByIdData(req.params.tlid)
    if (!todoList) return res.status(404).send({ error: "Data Not Found" })
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
    let status = req.query.status || ""
    let task = await todoModel.getTaskByIdData(tlid, tdid, status)
    if (!task) return res.status(404).send({ error: "Data Not Found" })
    return res.status(200).send(task)
}

// Add New Todo List
async function addTodoList(req, res) {
    if (req.body.length < 1) return res.status(400).send({ error: "Invalid Request." })
    let tempList = []
    for (let todoList of req.body) {
        if (!todoList.task || !todoList.status) return res.status(400).send({ error: "Invalid Request." })
        const id = uuidv4()
        let newTask = { id, ...todoList }
        tempList.push(newTask)
    }
    let newTodoList = await todoModel.addTodoListData(tempList)
    if (!newTodoList) return res.status(500).send({ error: "Cannot add Todo List." })
    return res.status(201).send(newTodoList)
}

// Add new Task to the specified todolist
async function addTask(req, res) {
    // Validate inputs
    if (!req.body.task || !req.body.status) return res.status(400).send({ error: "Invalid Request." })
    let { task, status } = req.body
    let newTask = { id: uuidv4(), task, status }
    let newTodoList = await todoModel.addTodoData(req.params.tlid, newTask)
    if (!newTodoList) return res.status(400).send({ error: "Cannot add Task. List does not exist." })
    return res.status(201).send(newTodoList)
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
    getTodoLists, getTodoListByID, getTaskByID,
    addTodoList, addTask,
    updateTodo, removeTodo, removeTodoByStatus
}