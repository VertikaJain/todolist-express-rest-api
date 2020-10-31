const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

const getTodos = require("./controllers/todoController")

app.get("/todos", async(req, res) => {
    let todoList = await getTodos()
    res.send(todoList)
})

app.listen(PORT, () => console.log(`Server Connected to ${PORT}`))
