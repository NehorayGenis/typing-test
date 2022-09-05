import { Component, createRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../customHooks/useForm'
import { contactService } from '../services/contactService'
import { loadContacts } from '../store/actions/contactActions'

export const ContactEdit = (props) => {

    // const [contact, setContact] = useState(null)

    const [contact, handleChange, setContact] = useForm()

    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadContact()
    }, [])


    const loadContact = async () => {
        const contactId = params.id
        const contact = contactId ? await contactService.getContactById(contactId) : contactService.getEmptyContact()
        setContact(contact)
    }

    // const handleChange = ({ target }) => {
    //     const field = target.name
    //     const value = target.type === 'number' ? (+target.value || '') : target.value
    //     // setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))
    //     setContact(prevContact => ({ ...prevContact, [field]: value }))
    // }

    

    const onSaveContact = async (ev) => {
        ev.preventDefault()
        await contactService.saveContact({ ...contact })
        navigate(`/contact/${contact._id}`)
    }

    const inputRefFunc = (elInput) => {
        elInput && elInput.focus()
    }



    if (!contact) return <div>Loading...</div>

    return (
        <section className='contact-edit flex column'>
            <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
            <form onSubmit={onSaveContact} className="flex column">
                <label htmlFor="name">Name</label>
                <input ref={inputRefFunc} value={contact.name} onChange={handleChange} type="text" name="name" id="name" placeholder='Name'/>
                <label htmlFor="phone">Phone</label>
                <input value={contact.phone} onChange={handleChange} type="text" name="phone" id="phone" placeholder='Phone'/>
                <label htmlFor="email">Email</label>
                <input value={contact.email} onChange={handleChange} type="text" name="email" id="email" placeholder='Email'/>

                <button>Save</button>
            </form>
        </section>
    )
}
