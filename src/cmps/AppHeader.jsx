import { useSelector } from "react-redux"
import { Navigate, NavLink, useNavigate, withRouter } from "react-router-dom"

export function AppHeader(props) {
    const { loggedInUser } = useSelector((state) => state.userModule)
    const navigate = useNavigate()
    return (
        <header className="app-header">
            <section className="flex space-between align-center">
                <NavLink to="/contacts" className="logo">
                    Contacts
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
                {/* <div className="back-btn" onClick={() => Navigate(-1)}>
                    <div class="backBtn ">
                        <span class="line tLine"></span>
                        <span class="line mLine"></span>
                        <span class="label">Back</span>
                        <span class="line bLine"></span>
                    </div>
                </div> */}
                <nav>
                    <NavLink className="link-to" to="/home">
                        Home
                    </NavLink>
                </nav>
            </section>
        </header>
    )
}
