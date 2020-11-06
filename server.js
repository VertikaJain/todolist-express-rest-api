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

// Update Tasks by ID
app.put("/lists/:tlid/todos/:tdid", (req, res) => {
    todoController.updateTask(req, res)
})

// Delete Todo List
app.delete("/lists/:tlid", (req, res) => {
    todoController.removeTodoList(req, res)
})

// Delete Tasks by ID
app.delete("/lists/:tlid/todos/:tdid", (req, res) => {
    todoController.removeTaskById(req, res)
})

app.listen(PORT, () => console.log(`Server Connected to ${PORT}`))
