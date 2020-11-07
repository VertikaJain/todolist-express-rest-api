const { all } = require("../routes")
const { allUsers } = require("../models/userModel")

async function getAllUsers(req, res) {
    try {
        if (req.query.page <= 0 || (req.query.page > req.query.limit))
            return res.status(400).send({ error: "Invalid Request." })
        let allUsersResult = await allUsers(req.query.page, req.query.limit)
        res.status(200).send(allUsersResult)
    } catch (error) {
        res.status(404).send({ error })
    }

}

module.exports = getAllUsers