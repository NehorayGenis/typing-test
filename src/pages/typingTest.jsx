import { WordsDisplay } from "../cmps/WordsToType"
import { useEffect, useState } from "react"
export const TypingTest = () => {
    const [clickCounter, setClickCounter] = useState(2)
    const firstRowBtns = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "←"]
    const secondRowBtns = ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"]
    const thirdRowBtns = ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", '"', "ENTER"]
    const fourthRowBtns = ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT"]
    console.log("loaded typing")
    useEffect(() => {
        const keyPressed = (e) => {
            e.preventDefault()
            setClickCounter(clickCounter => {
                let singleChrEl = document.querySelector(`.chr-num-${clickCounter}`)
                if (singleChrEl.innerText.length >1) {
                    return clickCounter + 1
                }
                if (singleChrEl.innerText === e.key) {
                    if (singleChrEl.classList.contains('incorrect-typing')) {
                        singleChrEl.classList.remove('incorrect-typing')
                    }
                    singleChrEl.classList.add(`correct-typing`)
                    return clickCounter + 1
                }else{
                    singleChrEl.classList.add(`incorrect-typing`)
                    return clickCounter

                }
            })    
            if (e.key === " ") {
                const pressedBtn = document.querySelector(`.btn-SPACE`)
                pressedBtn.classList.add(`clicked-btn`)
                const checkSection = document.querySelector(`.input-section`)
                checkSection.innerText += "_"
                return
            }
            const pressedBtn = document.querySelector(`.btn-${e.code.slice(-1)}`)
            pressedBtn.classList.add(`clicked-btn`)
            const checkSection = document.querySelector(`.input-section`)
            checkSection.innerText += e.code.slice(-1)
        }
        const keyReleased = (e) => {
            e.preventDefault()
            if (e.key === " ") {
                const pressedBtn = document.querySelector(`.btn-SPACE`)
                pressedBtn.classList.remove(`clicked-btn`)
                return
            }
            const pressedBtn = document.querySelector(`.btn-${e.key.toUpperCase()}`)
            pressedBtn.classList.remove(`clicked-btn`)
        }

        const typingSection = document.querySelector(".typing-section")
        const allKeyboardBtns = document.querySelectorAll(".keyboard-btn")
        typingSection.addEventListener("keypress", keyPressed)
        typingSection.addEventListener("keyup", keyReleased)
        typingSection.contentEditable = true
        typingSection.focus()
        allKeyboardBtns.forEach((btn) => {
            btn.classList.add(`btn-${btn.innerText}`)
        })

        return () => {
            document.removeEventListener("keypress", keyPressed)
            document.contentEditable = false
        }
    }, [])

    return (
        <div className="contact-details flex column">
            <WordsDisplay></WordsDisplay>
            <section className="input-section"></section>
            <section className="flex column align-center typing-section">
                <div className="number-row rows">
                    {firstRowBtns.map(function (btn, i) {
                        return (
                            <a className="keyboard-btn" key={i}>
                                {btn}
                            </a>
                        )
                    })}
                </div>
                <div className="first-row rows">
                    {secondRowBtns.map(function (btn, i) {
                        return (
                            <a className="keyboard-btn" key={i}>
                                {btn}
                            </a>
                        )
                    })}
                </div>
                <div className="second-row rows">
                    {thirdRowBtns.map(function (btn, i) {
                        return (
                            <a className="keyboard-btn" key={i}>
                                {btn}
                            </a>
                        )
                    })}
                </div>
                <div className="third-row rows">
                    {fourthRowBtns.map(function (btn, i) {
                        return (
                            <a className="keyboard-btn" key={i}>
                                {btn}
                            </a>
                        )
                    })}
                </div>
                <div className="third-row rows">
                    <a className="keyboard-btn">CONTROL</a>
                    <a className="keyboard-btn">
                        <i className="fa-brands fa-windows"></i>
                    </a>
                    <a className="keyboard-btn">ALT</a>
                    <a className="keyboard-btn">SPACE</a>
                    <a className="keyboard-btn">ALT</a>
                    <a className="keyboard-btn">CONTROL</a>
                </div>
            </section>
        </div>
    )
}
