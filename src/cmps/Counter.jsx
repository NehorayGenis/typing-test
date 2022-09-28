import { useEffect, useState } from "react";
// import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export const Counter = () => {

    const [count, setCount] = useState(0)
    const [isDark, setIsDark] = useState(false)

    // useEffect(() => {
    //     if (!count) return
    //     document.title = count
    //     return ()=>{
    //         // happens after count changes (every count effect)
    //     }
    // }, [count])

    // useEffectUpdate(() => {
    //     document.title = count
    //     return ()=>{
    //         // happens after count changes (every count effect)
    //     }
    // }, [count])


    const increment = () => {
        setCount(prevCount => prevCount + 1)
        // num++
        // console.log('num:', num)
    }

    return (
        <div style={{ backgroundColor: isDark ? '#888' : 'white' }} className="counter">
            <p>You clicked {count} times</p>
            <button onClick={increment}>
                Click me
            </button>
            <button onClick={() => setIsDark(prevIsDark => !prevIsDark)}>
                {isDark ? '☀️' : '🌓'}
            </button>
        </div>
    );
}
