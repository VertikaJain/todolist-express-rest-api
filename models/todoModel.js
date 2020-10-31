const todoList = require("../todolist.json")

// GET all todos
function getTodoData() {
    return new Promise((resolve, reject) => resolve(todoList))
}

module.exports = getTodoData