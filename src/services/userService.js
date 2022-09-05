import { storageService } from "./storageService"
import { makeId } from "./utilService"

var gLoggedInUser = {}

export const userService = {
    getUser,
    signUp,
    login,
    getUsersDb,
    setLocalStorageUsers,
}

function getUser() {
    return gLoggedInUser
}

function setLocalStorageUsers() {
    const usersDb = getUsersDb()
    storageService.store("USERS_DB", usersDb)
}

function signUp(user) {
    const BuiltUser = _buildNewUser(user)
    let userDb = storageService.load("USERS_DB")
    userDb.push(BuiltUser)
    storageService.store("USERS_DB", userDb)
    gLoggedInUser = BuiltUser
    return BuiltUser
}

function _buildNewUser({ name, password }) {
    return {
        _id: makeId(),
        name,
        balance: 100,
        moves: [],
        password,
    }
}

function login(user) {
    let UsersDB = storageService.load("USERS_DB")
    let saidUser = UsersDB.find((u) => u.name === user.name)
    if (saidUser.password === user.password) {
        delete saidUser.password
        gLoggedInUser = saidUser
        storageService.store("LOGGED-IN-USER", saidUser)
        return saidUser
    } else {
        return false
    }
}

function getUsersDb() {
    return [
        {
            _id: makeId(),
            name: "Ochoa Hyde",
            balance: 1020,
            moves: [],
            password: "a1234",
        },
        {
            _id: makeId(),
            name: "ayo man",
            balance: 10,
            moves: [],
            password: "a1234",
        },
        {
            _id: makeId(),
            name: "whats up",
            balance: 500,
            moves: [],
            password: "a1234",
        },
        {
            _id: makeId(),
            name: "major lili",
            balance: 1200,
            moves: [],
            password: "a1234",
        },
        {
            _id: makeId(),
            name: "harison graves",
            balance: 1005,
            moves: [],
            password: "a1234",
        },
        {
            _id: makeId(),
            name: "det babino",
            balance: 15200,
            moves: [],
            password: "a1234",
        },
    ]
}
