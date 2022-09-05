
const INITIAL_STATE = {
    actions: null,
}


// action = {type: SET_ACTIONS, actions: [...]}
export function actionReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_ACTIONS':
            return {
                ...state,
                actions: action.actions
            }

        case 'ADD_ACTION':
            return {
                ...state,
                actions: [...state.actions, action.action]
            }

        case 'REMOVE_ACTION':
            return {
                ...state,
                actions: state.actions.filter(action => action._id !== action.actionId)
            }

        case 'UPDATE_ACTION':
            return {
                ...state,
                actions: state.actions.map(action => action._id === action.action._id ? action.action : action)
            }

  



        default:
            return state;
    }
}