// ChatList.js
import React from 'react';
import '../CSS/ChatList.css';
import profile from '../assets/profile.svg';
import minus from "../assets/minus.svg"

function ChatList({ contacts, setActiveContact, onDeleteContact,userId }) {
    return (
        <div className="chat-list">
            <h2>DMs</h2>
            {contacts.map((contact) => (
                <div key={contact.id} className="chat-contact">
                    <img src={profile} alt="profile" width="50px" />
                    <div className='contact-item' onClick={() => setActiveContact(contact)}>
                        {contact.name}
                    </div>
                    <button className="delete-contact-btn" onClick={(e) => {
                        e.stopPropagation(); 
                        onDeleteContact(contact.id);
                    }}><img width='15px' src={minus} alt='delete'></img></button>
                </div>
            ))}
        </div>
    );
}

export default ChatList;
