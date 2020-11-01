const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

const { getTodos, getTodoByID, addNewTodo, updateTodo, removeTodo, getTodoByStatus, removeTodoByStatus } = require("./controllers/todoController")

app.use(express.json())

// GET all todos
app.get("/todos", async (req, res) => {
    let getTodoResult = await getTodos()
    if (getTodoResult.error)
        return res.status(404).send(getTodoResult)
    res.send(getTodoResult)
})

// GET task by ID
app.get("/todos/:id", async (req, res) => {
    let getTodoByIDResult = await getTodoByID(req.params.id)
    if (getTodoByIDResult.error)
        return res.status(404).send(getTodoByIDResult)
    res.send(getTodoByIDResult)
})

// GET task by Status
app.get("/todos/status/:status", async (req, res) => {
    let getTodoByStatusResult = await getTodoByStatus(req.params.status)
    if (getTodoByStatusResult.error)
        return res.status(404).send(getTodoByStatusResult)
    res.send(getTodoByStatusResult.todoList)
})

// Add new todo
app.post('/todos', async (req, res) => {
    // Validate Request
    if (!req.body.task || !req.body.status)
        return res.status(400).send({ error: "Invalid request" })
    // Return result -> data or error 
    let addNewTodoResult = await addNewTodo(req.body)
    if (addNewTodoResult.error)
        return res.status(404).send(addNewTodoResult)
    res.status(201).send(addNewTodoResult)
})

// Update Tasks by ID
app.put("/todos/:id", async (req, res) => {
    // Validate Request
    if (!req.body.task || !req.body.status)
        return res.status(400).send({ error: "Invalid request" })
    // Return result -> data or error 
    let updatedTodoResult = await updateTodo(req.params.id, req.body)
    if (updatedTodoResult.error && updatedTodoResult.status == 500)
        return res.status(500).send(updatedTodoResult)
    if (updatedTodoResult.error)
        return res.status(404).send(updatedTodoResult)
    res.status(200).send(updatedTodoResult)
})

// Delete Tasks by ID
app.delete("/todos/:id", async (req, res) => {
    let removeTodoResult = await removeTodo(req.params.id)
    if (removeTodoResult.error && removeTodoResult.status == 500)
        return res.status(500).send(removeTodoResult)
    if (removeTodoResult.error)
        return res.status(404).send(removeTodoResult)
    res.send(removeTodoResult)
})

// Delete Tasks by Status
app.delete("/todos/status/:status", async (req, res) => {
    let removeTodoResult = await removeTodoByStatus(req.params.status)
    if (removeTodoResult.error && removeTodoResult.status == 500)
        return res.status(500).send(removeTodoResult)
    if (removeTodoResult.error)
        return res.status(404).send(removeTodoResult)
    res.send(removeTodoResult)
})

app.listen(PORT, () => console.log(`Server Connected to ${PORT}`))
