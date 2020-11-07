require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const todoController = require("./controllers/todoController")

const router = express.Router()

// GET All Todo Lists
router.get("/", verifyToken, (req, res) => {
    todoController.getTodoLists(req, res)
})
// GET Todo List by ID
router.get("/:tlid", verifyToken, (req, res) => {
    todoController.getTodoListByID(req, res)
})

// GET Task based on ID
router.get("/:tlid/todos/:tdid", verifyToken, (req, res) => {
    todoController.getTaskByID(req, res)
})

// Add New Todo List
router.post('/', verifyToken, (req, res) => {
    todoController.addTodoList(req, res)
})

// Add New Task to the specified todolist
router.post('/:tlid', verifyToken, (req, res) => {
    todoController.addTask(req, res)
})

// Update Tasks by ID
router.put("/:tlid/todos/:tdid", verifyToken, (req, res) => {
    todoController.updateTask(req, res)
})

// Delete Todo List
router.delete("/:tlid", verifyToken, (req, res) => {
    todoController.removeTodoList(req, res)
})

// Delete Tasks by ID
router.delete("/:tlid/todos/:tdid", verifyToken, (req, res) => {
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

module.exports = router