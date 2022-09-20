
const INITIAL_STATE = {
    words: null,
}


// action = {type: SET_WORDS, words: [...]}
export function wordReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_WORDS':
            return {
                ...state,
                words: action.words
            }

        case 'ADD_WORD':
            return {
                ...state,
                words: [...state.words, action.action]
            }

        case 'REMOVE_WORD':
            return {
                ...state,
                words: state.words.filter(action => action._id !== action.actionId)
            }

        case 'UPDATE_WORD':
            return {
                ...state,
                words: state.words.map(action => action._id === action.action._id ? action.action : action)
            }

  



        default:
            return state;
    }
}