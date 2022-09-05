export const actionService = {
    getActions,
    getActionById,
    deleteAction,
    saveAction,
    getNewAction
}



const actions = [
    {
        "toId": "d99e3u2ih329",
        "to": "Moshiko",
        "at": "2652712571",
        "amount": "2"
    },
    {
        "toId": "d99e3u2ih329",
        "to": "Moshiko",
        "at": "2652712571",
        "amount": "12"
    },
    {
        "toId": "d99e3u2ih329",
        "to": "Moshiko",
        "at": "2652712571",
        "amount": "5"
    },
   
];

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

function getActions() {
    return new Promise((resolve, reject) => {
        // var actionsToReturn = actions;
        resolve(actions)
    })
}

function getActionById(id) {
    return new Promise((resolve, reject) => {
        const action = actions.find(action => action._id === id)
        action ? resolve(action) : reject(`Action id ${id} not found!`)
    })
}

function deleteAction(id) {
    return new Promise((resolve, reject) => {
        const index = actions.findIndex(action => action._id === id)
        if (index !== -1) {
            actions.splice(index, 1)
        }

        resolve(actions)
    })
}

function _updateAction(action) {
    return new Promise((resolve, reject) => {
        const index = actions.findIndex(c => action._id === c._id)
        if (index !== -1) {
            actions[index] = action
        }
        resolve(action)
    })
}

function _addAction(action) {
    return new Promise((resolve, reject) => {
        action._id = _makeId()
        actions.unshift(action)
        resolve(action)
    })
}

function saveAction(action) {
    return action._id ? _updateAction(action) : _addAction(action)
}

function getNewAction({_id,name},amount) {
    return  {
        _id,
        moveId:_makeId(),
        name,
        at: new Date(), 
        amount: amount
       }
}

function filter(term) {
    term = term.toLocaleLowerCase()
    return actions.filter(action => {
        return action.name.toLocaleLowerCase().includes(term) ||
            action.phone.toLocaleLowerCase().includes(term) ||
            action.email.toLocaleLowerCase().includes(term)
    })
}



function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}