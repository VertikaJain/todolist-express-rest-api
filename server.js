const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

const todoController = require("./controllers/todoController")

app.use(express.json())

// GET All Todo Lists
app.get("/lists", (req, res) => {
    todoController.getTodoLists(req, res)
})
// GET Todo List by ID
app.get("/lists/:tlid", (req, res) => {
    todoController.getTodoListByID(req, res)
})

// GET Task based on ID
app.get("/lists/:tlid/todos/:tdid", (req, res) => {
    todoController.getTaskByID(req, res)
})

// Add New Todo List
app.post('/lists', (req, res) => {
    todoController.addTodoList(req, res)
})

// Add New Task to the specified todolist
app.post('/lists/:tlid', (req, res) => {
    todoController.addTask(req, res)
})

/*
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
app.delete("/todos", async (req, res) => {
    let removeTodoResult = await removeTodoByStatus(req.query.status)
    if (removeTodoResult.error && removeTodoResult.status == 500)
        return res.status(500).send(removeTodoResult)
    if (removeTodoResult.error)
        return res.status(404).send(removeTodoResult)
    res.send(removeTodoResult)
}) */

app.listen(PORT, () => console.log(`Server Connected to ${PORT}`))
