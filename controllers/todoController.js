const getTodoData = require("../models/todoModel")

async function getTodos() {
    let todoList = await getTodoData()
    if (!todoList) return { error: "Data not found" }
    return { todoList }
}

module.exports = getTodos 