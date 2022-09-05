import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { NiceButton } from "../cmps/NiceButton"
import { ContactFilter } from "../cmps/ContactFilter"
import { ContactList } from "../cmps/ContactList"
import { loadContacts, removeContact, setFilterBy } from "../store/actions/contactActions"
import { spendBalance } from "../store/actions/userActions"

export const ContactApp = (props) => {
    const navigate = useNavigate()
    const contacts = useSelector((state) => state.contactModule.contacts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadContacts())
    },[])

    const onRemoveContact = async (contactId) => {
        // await contactService.remove(contactId)
        // loadContacts()
        await dispatch(removeContact(contactId))
    }

    const onChangeFilter = useCallback((filterBy) => {
        // setState({ filterBy }, loadContacts)
        dispatch(setFilterBy(filterBy))
        dispatch(loadContacts())
    }, [])

    const onSpendBalance = () => {
        dispatch(spendBalance(5))
    }

    // const getBigNum = () => {
    //     let sum = 0
    //     for (let i = 0; i < 10 ** 8.6; i++) {
    //         sum += i
    //     }
    //     return sum
    // }
    // // const bigNum = getBigNum()

    // const bigNum = useMemo(() => {
    //     let sum = 0
    //     for (let i = 0; i < 10 ** 8.6; i++) {
    //         sum += i
    //     }
    //     return sum + (contacts?.length ** 5 || 0)
    // }, [contacts?.length])

    if (!contacts) return <div>Loading...</div>
    const TextCmp = () => <span>Nice Button</span>
    const Icon = () => "🍇"

    const goToDetails = () => {
        navigate("/contact/edit/", { replace: true })
    }

    return (
        <div className="contact-app">
            <ContactFilter onChangeFilter={onChangeFilter} />
            <Link to={`/contact/edit`} className="button_plus"></Link>
            <ContactList history={props.history} onRemoveContact={onRemoveContact} contacts={contacts} />
        </div>
    )
}
