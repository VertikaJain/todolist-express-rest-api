// Multiple Users
const users = [
    { id: 1, username: "user1", email: "user1@gmail.com" },
    { id: 2, username: "user2", email: "user2@gmail.com" },
    { id: 3, username: "user3", email: "user3@gmail.com" },
    { id: 4, username: "user4", email: "user4@gmail.com" },
    { id: 5, username: "user5", email: "user5@gmail.com" },
    { id: 6, username: "user6", email: "user6@gmail.com" },
    { id: 7, username: "user7", email: "user7@gmail.com" },
    { id: 8, username: "user8", email: "user8@gmail.com" },
    { id: 9, username: "user9", email: "user9@gmail.com" },
    { id: 10, username: "user10", email: "user10@gmail.com" },
    { id: 11, username: "user11", email: "user11@gmail.com" },
    { id: 12, username: "user12", email: "user12@gmail.com" },
    { id: 13, username: "user13", email: "user13@gmail.com" },
    { id: 14, username: "user14", email: "user14@gmail.com" },
    { id: 15, username: "user15", email: "user15@gmail.com" },
]

function verifyUser(user) {
    return new Promise((resolve, reject) => {
        let userResult = users.find(u => u.username == user.username)
        if (!userResult) reject("User does not exist.")
        resolve(userResult)
    })
}

// Get all Users with Pagination implementation
function allUsers(page, limit) {
    return new Promise((resolve, reject) => {
        if (users.length < 1) reject("Users not found.")
        if (page && limit) {
            page = parseInt(page)
            limit = parseInt(limit)
            if (limit > users.length) return resolve(users)
            const startIndex = limit * (page - 1)
            const endIndex = limit * page
            let result = {}
            result.users = users.slice(startIndex, endIndex)
            if (endIndex < users.length)
                result.next = { page: page + 1, limit }
            if (startIndex > 0)
                result.previous = { page: page - 1, limit }
            return resolve(result)
        }
        resolve(users)
    })
}

module.exports = { verifyUser, allUsers }