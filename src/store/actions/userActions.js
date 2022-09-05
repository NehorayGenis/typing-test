export function spendBalance(amount,reciver) {
    return async (dispatch) => {
        dispatch({ type: 'SPEND_BALANCE', amount,reciver })
    }
}

export function signUpUser(user) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'ADD_USER', user })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function LoginUser(user) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'LOGIN_USER', user })
        } catch (err) {
            console.log('err:', err)
        }
    }
}