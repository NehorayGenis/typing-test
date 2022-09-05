import { actionService } from "../../services/actionsService"


export function loadActions() {

    return async (dispatch, getState) => {
        try {
            const actions = await actionService.getActions()
            dispatch({ type: 'SET_ACTIONS', actions })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeAction(actionId) {

    return async (dispatch, getState) => {
        try {
            const action = await actionService.deleteAction(actionId)
            dispatch({ type: 'REMOVE_ACTION', actionId })
            return action
        } catch (err) {

            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}