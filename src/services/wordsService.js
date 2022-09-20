export const wordService = {
    getWords,
    getWordById,
    deleteWord,
    saveWord,
    getNewWord
}
var randomWords = require('random-words');



const actions = randomWords(15)

function sort(arr) {
    return arr.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        }

        return 0;
    })
}

function getWords() {
    return new Promise((resolve, reject) => {
        // var actionsToReturn = actions;
        const words=randomWords(15)
        resolve(words)
    })
}

function getWordById(id) {
    return new Promise((resolve, reject) => {
        const action = actions.find(action => action._id === id)
        action ? resolve(action) : reject(`Word id ${id} not found!`)
    })
}

function deleteWord(id) {
    return new Promise((resolve, reject) => {
        const index = actions.findIndex(action => action._id === id)
        if (index !== -1) {
            actions.splice(index, 1)
        }

        resolve(actions)
    })
}

function _updateWord(action) {
    return new Promise((resolve, reject) => {
        const index = actions.findIndex(c => action._id === c._id)
        if (index !== -1) {
            actions[index] = action
        }
        resolve(action)
    })
}

function _addWord(action) {
    return new Promise((resolve, reject) => {
        action._id = _makeId()
        actions.unshift(action)
        resolve(action)
    })
}

function saveWord(action) {
    return action._id ? _updateWord(action) : _addWord(action)
}

function getNewWord({_id,name},amount) {
    return  {
        _id,
        moveId:_makeId(),
        name,
        at: new Date(), 
        amount: amount
       }
}



function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}