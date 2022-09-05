import { useEffect, useRef, useState } from "react"


export const Timer = () => {
    const [time, setTime] = useState(0)
    const intervalRef = useRef('hi')
    
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime(prevTime => prevTime + 1)
        }, 1000)
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])



    const stopInterval = () => {
        clearInterval(intervalRef.current)
    }


    return (
        <section className="timer">
            <h3>Clock</h3>
            <p>{time}</p>
            <button onClick={stopInterval} >Stop</button>
        </section>
    )
}
