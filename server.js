require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const PORT = process.env.PORT || 5000

const todoController = require("./controllers/todoController")

app.use(express.json())

// Login with JWT authorization
app.post("/users/login", (req, res) => {
    let user = { username: req.body.username }
    // Get Token
    jwt.sign(user, process.env.ACCESS_SECRET_KEY, (err, token) => {
        if (err) res.json({ err })
        res.json({ token })
    })
})

// GET All Todo Lists
app.get("/lists", verifyToken, (req, res) => {
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

// Middleware to Verify JWT Token
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)
    // Verify
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403) // invalid token
        req.user = user
        next()
    })
}

app.listen(PORT, () => console.log(`Server Connected to ${PORT}`))
