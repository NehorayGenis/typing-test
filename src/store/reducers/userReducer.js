import {userService} from "../../services/userService"
const INITIAL_STATE = {
    loggedInUser: userService.getUser(),
    allUsers:userService.getUsersDb()
}



export function userReducer(state = INITIAL_STATE, action,reciver) {
    switch (action.type) {
        case 'SPEND_BALANCE':
            const { loggedInUser } = state
            return {
                ...state,
                loggedInUser: { ...loggedInUser, balance: loggedInUser.balance - action.amount }
            }
        case 'ADD_USER':
            const { allUsers } = state
            const newUser=userService.signUp(action.user)
            allUsers.push(newUser)
            return {
                ...state,
                allUsers: { ...allUsers },
                loggedInUser:{...newUser}
            }
        case 'LOGIN_USER':
            return {
                ...state,
                loggedInUser:{...action.user}
            }

        default:
           return state
    }
}