import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { contactService } from "../services/contactService"
import { useDispatch, useSelector } from "react-redux"
import { spendBalance } from "../store/actions/userActions"
import { loadContacts, removeContact } from "../store/actions/contactActions"
import { storageService } from "../services/storageService"

export const ContactDetails = (props) => {
    const [contact, setContact] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const [moneyTransfer, setMoneyTransfer] = useState(0)
    const dispatch = useDispatch()
    const { loggedInUser } = useSelector((state) => state.userModule)
    // let relMoves = []
    const [relMoves, setRelMoves] = useState([])
    useEffect(() => {
        dispatch(loadContacts())
        loadContact()
    }, [params.id])

    async function loadContact() {
        const contactId = params.id
        const relMovesOfUser = loggedInUser.moves?.filter((move) => move._id === contactId) || []
        const contact = await contactService.getContactById(contactId)
        setContact(contact)
        setRelMoves(relMovesOfUser)
        // console.log(relMoves)
    }

    const onBack = () => {
        navigate("/contacts")
    }
    const handleChange = ({ target }) => {
        setMoneyTransfer(+target.value)
    }

    const onTransferMoney = async (ev) => {
        ev.preventDefault()
        if (loggedInUser.balance < moneyTransfer) {
            return
        }

        await dispatch(spendBalance(moneyTransfer, contact))
        loadContact()
    }

    const onRemoveContact = async (contactId) => {
        // await contactService.remove(contactId)
        // loadContacts()
        await dispatch(removeContact(contactId))
    }

    const ConvertToBc = (amount) => {
        let converion_rate = storageService.load("BC_CONVERSION")
        return (amount * converion_rate).toFixed(5)
    }

    if (!contact) return <div>Loading...</div>
    return (
        <div className="contact-details flex column">
            <section>
                <section className="actions flex space-between align-center">
                    <Link className="edit-link" to={`/contact/edit/${contact._id}`}>Edit</Link>
                    <button onClick={() => onRemoveContact(contact._id)}>Delete</button>
                </section>
                <img className="pfp-avatar-main" src={`https://robohash.org/${contact._id}`} alt="" />
                <section className="flex column align-center contact-details">
                    <h1>{contact.name}</h1>
                    <h2>{contact.phone}</h2>
                    <h3>{contact.email}</h3>
                </section>
            </section>
            {(() => {
                if (Object.keys(loggedInUser).length > 0) {
                    return (
                        <form onSubmit={onTransferMoney}>
                            <input
                                value={moneyTransfer.amount}
                                onChange={handleChange}
                                type="number"
                                name="amount"
                                id="amount"
                            />
                            <button>send</button>
                        </form>
                    )
                } else {
                    return <div className="section-title">Not logged in...</div>
                }
            })()}
            {(() => {
                if (relMoves.length === 0) {
                    return <h1 className="section-title">no relevent moves</h1>
                } else {
                    return (
                        <div className="moves-in-user">
                            <div className="flex align-center">
                                <i class="fa-solid fa-arrows-spin"></i>
                                <h1 className="section-title">moves history</h1>
                            </div>
                            {relMoves.map((action) => (
                                <section key={action.moveId} className="move-info flex column align-center">
                                    <div className="flex align-center amount-display">
                                        <span className="bc-display">
                                            {ConvertToBc(action.amount)} <i class="fa-solid fa-bitcoin-sign"></i>
                                        </span>
                                        <span>
                                            <i class="fa-solid fa-grip-lines-vertical"></i>
                                        </span>
                                        <span className="dollar-display">
                                            <i class="fa-solid fa-dollar-sign"></i>
                                            {action.amount}
                                        </span>
                                    </div>
                                    <span className="date-of-transfer">
                                        {action.at.toLocaleDateString()}, {action.at.toLocaleTimeString()}
                                    </span>
                                </section>
                            ))}
                        </div>
                    )
                }
            })()}
        </div>
    )
}
