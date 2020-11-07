// Multiple Users
const users = [
    { username: "vertika", email: "vertika@gmail.com" },
    { username: "vinita", email: "vinita@gmail.com" }
]

function verifyUser(user) {
    return new Promise((resolve, reject) => {
        let userResult = users.find(u => u.username == user.username)
        if (!userResult) reject("User does not exist.")
        resolve(userResult)
    })
}

module.exports = verifyUser