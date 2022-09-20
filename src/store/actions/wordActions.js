import { wordService } from "../../services/wordsService.js"


export function loadWords() {
    return async (dispatch, getState) => {
        try {
            const words = await wordService.getWords()
            console.log(words);
            dispatch({ type: 'SET_WORDS', words })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeWord(wordId) {

    return async (dispatch, getState) => {
        try {
            const word = await wordService.deleteWord(wordId)
            dispatch({ type: 'REMOVE_WORD', wordId })
            return word
        } catch (err) {

            console.log('err:', err)
        }
    }
}
