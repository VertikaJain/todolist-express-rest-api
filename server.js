const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

const { getTodos, addNewTodo } = require("./controllers/todoController")

app.use(express.json())

// GET all todos
app.get("/todos", async (req, res) => {
    let getTodoResult = await getTodos()
    if (getTodoResult.error)
        return res.status(404).send(getTodoResult)
    res.send(getTodoResult)
})

// Add new todo
app.post('/todos', async (req, res) => {
    // Validate Request
    if (!req.body || !req.body.task || !req.body.status)
        return res.status(400).send({ error: "Invalid request" })
    // Return result -> data or error 
    let addNewTodoResult = await addNewTodo(req.body)
    if (addNewTodoResult.error)
        return res.status(404).send(addNewTodoResult)
    res.status(201).send(addNewTodoResult)
})

app.listen(PORT, () => console.log(`Server Connected to ${PORT}`))
