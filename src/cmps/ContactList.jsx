import { Component } from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts, onRemoveContact, history }) {
    
    return (
        <div className='contact-list simple-cards-grid'>
            {contacts.map(contact => <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact}  />)}
        </div>
    )
}
