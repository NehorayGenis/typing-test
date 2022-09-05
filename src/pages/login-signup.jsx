import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { storageService } from "../services/storageService"
import { userService } from "../services/userService"
import { loadContacts } from "../store/actions/contactActions"
import { LoginUser, signUpUser } from "../store/actions/userActions"

export function LoginSignup(props) {
    const navigate = useNavigate()
    const [succesLogin, setSuccesLogin] = useState(null)
    const [newUSerClick, setNewUSerClick] = useState(null)
    const [userAttampt, setUserAttampt] = useState({
        name: "",
        password: "",
    })
    const dispatch = useDispatch()
    const convertToBitcoin = async () => {
        try {
            const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
            storageService.store("BC_CONVERSION", data)
        } catch (err) {
            console.log("err:", err)
        }
    }

    useEffect(() => {
        dispatch(loadContacts())
        convertToBitcoin()
        var elinputs = document.querySelectorAll("input")
        elinputs.forEach((elinput) => {
            elinput.addEventListener("keypress", function (e) {
                if (e.which === 13) {
                    loginAttempt()
                }
            })
        })
        return () => {
            document.title = "React Contact App"
        }
    })

    const loginAttempt = async (ev = null) => {
        try {
            if (ev) {
                ev.preventDefault()
            }
            if (newUSerClick) {
                await onSignup()
            } else {
                const res = userService.login(userAttampt)
                if (res) {
                    setSuccesLogin(true)
                    await dispatch(LoginUser(res))
                }
            }
            setTimeout(() => {
                navigate("/contacts", { replace: true })
            }, 1000)
        } catch (err) {
            console.log("err:", err)
        }
    }

    const onSignup = async () => {
        await dispatch(signUpUser(userAttampt))
    }

    const onSignupClick = () => {
        const userClicked = !newUSerClick
        setNewUSerClick(userClicked)
    }

    const onHandleChange = ({ target }) => {
        let newTrial = { ...userAttampt }
        newTrial[target.name] = target.value
        setUserAttampt(newTrial)
    }

    return (
        <section className="flex column align-center">
            <form onSubmit={loginAttempt} className="flex column align-center login-form">
                <label htmlFor="name">name</label>
                <input
                    value={userAttampt.name}
                    onChange={onHandleChange}
                    type="text"
                    name="name"
                    id="name"
                    className="login-inputs"
                />
                <label htmlFor="password">password</label>
                <input
                    value={userAttampt.password}
                    onChange={onHandleChange}
                    type="password"
                    name="password"
                    id="password"
                    className="login-inputs"
                />
            </form>
            {(() => {
                if (newUSerClick === true) {
                    return <a onClick={loginAttempt}>signup</a>
                } else {
                    return (
                        <div className="flex column align-center">
                            <a className="login-page-bottons" onClick={loginAttempt}>
                                login
                            </a>
                            <a className="login-page-bottons signup" onClick={onSignupClick}>
                                no user? click here to sign up!
                            </a>
                        </div>
                    )
                }
            })()}

            <div>
                {(() => {
                    if (succesLogin === true) {
                        return <div>logged in succesfully!</div>
                    } else if (succesLogin === false) {
                        return <div>password or username is incorrect</div>
                    }
                })()}
            </div>
        </section>
    )
}
