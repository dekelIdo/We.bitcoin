import { contactService } from "./contactService"
import { storageService } from "./storage.service"
import { utilService } from "./util.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const user = {
    name: "Eldad",
    balance: 1000,
    _id: utilService.makeId(),
    transactions: [
        {
            toId: "d99e3u2ih329",
            to: "Moshiko",
            at: 2652712571,
            amount: 2
        },
    ]
}

const gDefaultUsers = [
    {
        name: "Eldad",
        balance: 1000,
        _id: '12345',
    },
    {
        name: "Dekel",
        balance: 1000,
        _id: '44444',
    },
    {
        name: "Yaara",
        balance: 1000,
        _id: '8888',
    },
    {
        name: "Bar",
        balance: 1000,
        _id: '3333',
    },
]


function getUsers() {
    return new Promise((resolve, reject) => {
        var usersToReturn = storageService.load('userDB') || gDefaultUsers;
        storageService.save('userDB', usersToReturn)
        resolve(usersToReturn)
    })
}

function getContactById(id) {
    return new Promise((resolve, reject) => {
        var users = storageService.load('userDB') || gDefaultUsers;
        const user = users.find(user => user._id === id)
        user ? resolve(user) : reject(`User id ${id} not found!`)
    })
}

function login(username) {
    const users = storageService.load('userDB') || gDefaultUsers
    const userIsExist = users.find(user => user.name === username)
    
    if (!userIsExist) {
        return 'username is not exist'
    }

    else {
        saveLocalUser(userIsExist)
        return userIsExist
    }
}

async function signup(username) {

    const users = storageService.load('userDB') || gDefaultUsers
    const userIsExist = users.find(user => user.name === username)
    const contacts = await contactService.getContacts()

    if (!userIsExist) {
        const _id = utilService.makeId()
        const user = {
            name: username,
            balance: 1000,
            _id: _id,
            transactions: []
        }
        users.push(user)

        const contact = {
            _id: _id,
            name: username,
            email: `${username}@gmail.com`,
            phone: '+972 5654-2557'
        }
        contacts.push(contact)
        storageService.save('userDB', users)
        storageService.save('ContactDB', contacts)
        
        return user
    }

    else return userIsExist
}

function logout() {
    saveLocalUser(null)
}

function _updateUser(user) {
    const users = storageService.load('userDB') || gDefaultUsers

    return new Promise((resolve, reject) => {
        const index = users.findIndex(c => user._id === c._id)
        if (index !== -1) {
            users[index] = user
        }
        storageService.save('userDB', users)
        resolve(user)
    })
}
function _getDateStr(){
    const day = new Date().getDay()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    const str = `${day}/${month}/${year}`
    return str
}

function transferFunds(fromUser, toUser, amount) {
    const users = storageService.load('userDB') || gDefaultUsers
    const newToUser = users.find(user => user.name === toUser.name)
    if (amount <= 0) return
    
    if (fromUser.balance < amount) return
    if (!newToUser.balance) {
        newToUser[balance] = 0.5
    }
    const transactionFromUser = {
        toId: fromUser._id,
        to: `From ${fromUser.name}`,
        at: _getDateStr(),
        amount: amount,
        type: 'Incoming transfer'
    }
    if(!newToUser.transactions){
        newToUser.transactions = []
    }
    newToUser.transactions.push(transactionFromUser)    
    newToUser.balance += +amount    
    _updateUser(newToUser)

    const userToUpdate = users.find(user => user.name === fromUser.name)

    const transaction = {
        toId: toUser._id,
        to: `To ${toUser.name}`,
        at: _getDateStr(),
        amount: amount,
        type: 'Outgoing transfer'
    }
    
    if(!userToUpdate.transactions){
        userToUpdate.transactions = []
    }

    userToUpdate.transactions.push(transaction)
    userToUpdate.balance -= amount

    return _updateUser(userToUpdate)
}


function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

export const userService = {
    getLoggedInUser,
    signup,
    getUsers,
    getContactById,
    login,
    logout,
    transferFunds,
}