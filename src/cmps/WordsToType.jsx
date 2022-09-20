import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { wordService } from "../services/wordsService"
import { loadWords } from "../store/actions/wordActions"

export const WordsDisplay = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadWords())
    },[])

    const wordsToDisplay = useSelector((state) => state.wordModule.words)
    console.log(wordsToDisplay);
    if (!wordsToDisplay) return <div>Loading...</div>
    return (
        <form className="">
            {wordsToDisplay.map((word) => (
                    <span> {word}_</span>
            ))}
        </form>
    )
}
