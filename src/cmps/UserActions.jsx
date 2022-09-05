import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadActions } from "../store/actions/actionActions"

export function UserActions(props) {
    const { actions } = useSelector((state) => state.actionModule)
    const dispatch = useDispatch()
    const { loggedInUser } = useSelector((state) => state.userModule)
    useEffect(() => {
        dispatch(loadActions())
    }, [])

    if (!actions) return "no actions yet"
    return (
        <header className="app-header">
            {(() => {
                if (Object.keys(loggedInUser).length !== 0) {
                    return (
                        <div className="contact-list flex column">
                            {actions.map((action) => (
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
