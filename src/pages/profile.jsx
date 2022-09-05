import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { storageService } from "../services/storageService"

export function Profile(props) {
    const { loggedInUser } = useSelector((state) => state.userModule)
    const [amountofBc, setAmountofBc] = useState(0)
    useEffect(() => {
        convertToBitcoin()
    })

    const convertToBitcoin = async () => {
        try {
            // const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
            // storageService.store("BC_CONVERSION", data)
            let converion_rate = storageService.load("BC_CONVERSION")
            setAmountofBc(converion_rate*loggedInUser.balance)
        } catch (err) {
            console.log("err:", err)
        }
    }

    if (!loggedInUser) return <div>Loading...</div>
    return (
        <section className="profile-main flex column align-center">
            <div className="profile-app">
                <img src={`https://robohash.org/${loggedInUser._id}`} alt="" />
                <section className="profile-info flex column">
                    <h1>name:{loggedInUser.name}</h1>
                    <h1>{loggedInUser.balance}$</h1>
                    <h1>{amountofBc}₿</h1>
                </section>
            </div>
            <section className="actions">
                {(() => {
                    if (loggedInUser.moves?.length > 0) {
                        return (
                            <div>
                                {loggedInUser.moves.slice(0, 3).map((action) => (
                                    <section key={action.moveId}>
                                        <p>Name: {action._id}</p>
                                        <p>Name: {action.name}</p>
                                        <p>Name: {action.at.toLocaleTimeString()}</p>
                                        <p>Name: {action.amount}</p>
                                    </section>
                                ))}
                            </div>
                        )
                    } else {
                        return <div>no moves in this account yet</div>
                    }
                })()}
            </section>
        </section>
    )
}
