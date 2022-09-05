import { Component } from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onSelectContactId, onRemoveContact }) {
    return (
        <div className='contact-preview'>
            <Link to={`/contact/${contact._id}`} className='info'>
                <img src={`https://robohash.org/${contact._id}`} className="member-avatar" alt="" />
                <h2>{contact.name}</h2>
            </Link>
            <section className='actions' >
                <button onClick={() => onRemoveContact(contact._id)}>Delete</button>
                <Link to={`/contact/edit/${contact._id}`} >Edit</Link>
            </section>

        </div>
    )
}
