import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

export function UserActions(props) {
    const dispatch = useDispatch()
    const { loggedInUser } = useSelector((state) => state.userModule)

    if (Object.keys(loggedInUser.moves).length === 0) return "no actions yet"
    return (
        <header className="app-header">
            {(() => {
                if (Object.keys(loggedInUser.moves).length !== 0) {
                    return (
                        <div className="contact-list flex column">
                            {loggedInUser.moves.map((action) => (
                                <section>
                                    <p>Name: {action.amount}</p>
                                    <p>Name: {action.at}</p>
                                    <p>Name: {action.to}</p>
                                    <p>Name: {action.toId}</p>
                                </section>
                            ))}
                        </div>
                    )
                }
            })()}
        </header>
    )
}
