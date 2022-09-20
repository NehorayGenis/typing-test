import { useSelector } from "react-redux"
import { Navigate, NavLink, useNavigate, withRouter } from "react-router-dom"

export function AppHeader(props) {
    const { loggedInUser } = useSelector((state) => state.userModule)
    const navigate = useNavigate()
    return (
        <header className="app-header">
            <section className="flex space-between align-center">
                <NavLink to="/typing" className="logo">
                    typing time
                </NavLink>
                {(() => {
                    if (Object.keys(loggedInUser).length !== 0) {
                        return (
                            <section className="user flex align-center">
                                <section className="pfp-details">
                                    <p>Name: {loggedInUser.name}</p>
                                    <p>Balance: {loggedInUser.balance}</p>
                                </section>
                                <NavLink to="/profile">
                                    <img
                                        src={`https://robohash.org/${loggedInUser._id}`}
                                        className="member-avatar"
                                        alt=""
                                    />
                                </NavLink>
                            </section>
                        )
                    }
                })()}
                <nav>
                    <NavLink className="link-to" to="/home">
                        Home
                    </NavLink>
                </nav>
            </section>
        </header>
    )
}
