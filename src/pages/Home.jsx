import { Component } from "react"
import { About } from "./About"
import { Statistics } from "./statistics"


export function Home (){
        return (
            <div>
                <iframe title="home-page-frame" src="https://embed.lottiefiles.com/animation/93344" className="home-svg"></iframe>
                <div className="m20">
                <Statistics></Statistics>
                </div>
                <div className="m20">
                <About></About>
                </div>
            </div>
        )
}
