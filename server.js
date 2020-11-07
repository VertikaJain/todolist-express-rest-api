require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const PORT = process.env.PORT || 5000

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

// Pagination Implementation
app.get("/users", (req, res) => {
    const getAllUsers = require("./controllers/userController")
    getAllUsers(req, res)
})

// Routes
const listsRouter = require("./routes")
app.use("/lists", listsRouter)

app.listen(PORT, () => console.log(`Server Connected to ${PORT}`))
