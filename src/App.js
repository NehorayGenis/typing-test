import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom"

import "./assets/scss/global.scss"
import { AppHeader } from "./cmps/AppHeader"
import { About } from "./pages/About"
import { Profile } from "./pages/profile"
import { Statistics } from "./pages/statistics"
import { TypingTest } from "./pages/typingTest"
import { LoginSignup } from "./pages/login-signup"
import { userService } from "./services/userService"
import { Home } from "./pages/Home"

const Team = () => {
    return (
        <ul>
            <li>Moshe Leon</li>
            <li>Lala Ben Regev</li>
            <li>Shimon DiCaprio</li>
        </ul>
    )
}

const Vision = () => {
    return (
        <ol>
            <li>Save the world with our contacts</li>
            <li>Take over the world with our contacts</li>
        </ol>
    )
}

const PrivateRoute = ({ children }) => {
    const isLoggedIn = userService.getUser()
    // return isAdmin ? <Route path={props.path} component={props.component} /> : <Redirect to='/' />
    if (Object.keys(isLoggedIn).length === 0) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/" />
    }
    return children
}

export default function App() {
    return (
        <Router>
            <div className="main-app">
                
                <AppHeader />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<LoginSignup />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/typing" element={<TypingTest />} />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/about" element={<About />}>
                            <Route path="team" element={<Team />} />
                            <Route path="vision" element={<Vision />} />
                        </Route>
                    </Routes>
                </main>
                <footer>
                    <section>contactRights 2022 &copy;</section>
                </footer>
            </div>
        </Router>
    )
}

// export default App
