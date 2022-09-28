import { WordsDisplay } from "../cmps/WordsToType"
import { useEffect, useState } from "react"
export const TypingTest = () => {
    const [clickCounter, setClickCounter] = useState(1)
    
    useEffect(() => {
        console.log('loaded typing');
        const typingSection = document.querySelector(".typing-section")
        const allKeyboardBtns = document.querySelectorAll(".keyboard-btn")
        allKeyboardBtns.forEach((btn) => {
            btn.classList.add(`btn-${btn.innerText}`)
        })
        typingSection.addEventListener("keypress", keyPressed, true)
        typingSection.addEventListener("keyup", keyReleased, true)
        typingSection.addEventListener("focusout", outOfFocus, true)
        typingSection.addEventListener("focusin", inFocus, true)
        typingSection.contentEditable = true
        typingSection.focus()

        return () => document.removeEventListener("keydown", keyPressed)
    })

    const keyPressed = (e) => {
        e.preventDefault()
        // console.log(clickCounter +1);
        const temp=clickCounter+1
        setClickCounter(temp)
        let singleChrEl=document.querySelector(`.chr-num-${clickCounter +1}`)
        // console.log(singleChrEl.innerText)
        if (e.key === " ") {
            const pressedBtn = document.querySelector(`.btn-SPACE`)
            pressedBtn.classList.add(`clicked-btn`)
            const checkSection = document.querySelector(`.input-section`)
            checkSection.innerText += "_"
            return
        }
        const pressedBtn = document.querySelector(`.btn-${e.key.toUpperCase()}`)
        pressedBtn.classList.add(`clicked-btn`)
        const checkSection = document.querySelector(`.input-section`)
        checkSection.innerText += e.key.toUpperCase()
        return
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
        return
    }

    const outOfFocus = () => {
        console.log("went out of focus")
    }
    const inFocus = () => {
        console.log("focused up")
    }

    return (
        <div className="contact-details flex column">
            <WordsDisplay></WordsDisplay>
            <section className="input-section"></section>
            <section className="flex column align-center typing-section">
                <div className="number-row rows">
                    <a className="keyboard-btn">`</a>
                    <a className="keyboard-btn">1</a>
                    <a className="keyboard-btn">2</a>
                    <a className="keyboard-btn">3</a>
                    <a className="keyboard-btn">4</a>
                    <a className="keyboard-btn">5</a>
                    <a className="keyboard-btn">6</a>
                    <a className="keyboard-btn">7</a>
                    <a className="keyboard-btn">8</a>
                    <a className="keyboard-btn">9</a>
                    <a className="keyboard-btn">0</a>
                    <a className="keyboard-btn">-</a>
                    <a className="keyboard-btn">=</a>
                    <a className="keyboard-btn">←</a>
                </div>
                <div className="first-row rows">
                    <a className="keyboard-btn">TAB</a>
                    <a className="keyboard-btn">Q</a>
                    <a className="keyboard-btn">W</a>
                    <a className="keyboard-btn">E</a>
                    <a className="keyboard-btn">R</a>
                    <a className="keyboard-btn">T</a>
                    <a className="keyboard-btn">Y</a>
                    <a className="keyboard-btn">U</a>
                    <a className="keyboard-btn">I</a>
                    <a className="keyboard-btn">O</a>
                    <a className="keyboard-btn">P</a>
                    <a className="keyboard-btn">[</a>
                    <a className="keyboard-btn">]</a>
                    <a className="keyboard-btn">\</a>
                </div>
                <div className="second-row rows">
                    <a className="keyboard-btn">CAPS</a>
                    <a className="keyboard-btn">A</a>
                    <a className="keyboard-btn">S</a>
                    <a className="keyboard-btn">D</a>
                    <a className="keyboard-btn">F</a>
                    <a className="keyboard-btn">G</a>
                    <a className="keyboard-btn">H</a>
                    <a className="keyboard-btn">J</a>
                    <a className="keyboard-btn">K</a>
                    <a className="keyboard-btn">L</a>
                    <a className="keyboard-btn">;</a>
                    <a className="keyboard-btn">'</a>
                    <a className="keyboard-btn">ENTER</a>
                </div>
                <div className="third-row rows">
                    <a className="keyboard-btn">SHIFT</a>
                    <a className="keyboard-btn">Z</a>
                    <a className="keyboard-btn">X</a>
                    <a className="keyboard-btn">C</a>
                    <a className="keyboard-btn">V</a>
                    <a className="keyboard-btn">B</a>
                    <a className="keyboard-btn">N</a>
                    <a className="keyboard-btn">M</a>
                    <a className="keyboard-btn">,</a>
                    <a className="keyboard-btn">.</a>
                    <a className="keyboard-btn">/</a>
                    <a className="keyboard-btn">SHIFT</a>
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
