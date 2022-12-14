import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadWords } from "../store/actions/wordActions"

export const WordsDisplay = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadWords())
    }, [])
    const wordsToDisplay = useSelector((state) => state.wordModule.words)

    const renderFunction= () =>{
        let counter = 0
        return (
            wordsToDisplay.map((word, primeIndex) => {
                counter ++
                return (
                    <div key={primeIndex} className={`chr-num-${counter}`}>
                    {word.map((chr, index) => {
                    counter ++
                        return (
                            <span className={`chr-num-${counter}`} key={index}>
                                {chr}
                            </span>
                        )
                    })}
                    _
                </div>
            )
        }))
    }

    if (!wordsToDisplay) return <div>Loading...</div>
    return (
        <section className="words-to-type">
            {renderFunction()}
        </section>
    )
}
