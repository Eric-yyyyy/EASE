
import React from 'react';
import '../CSS/ChatList.css'
import profile from '../assets/profile.svg';

import { useState } from 'react';


function ChatList({ activeContact, setActiveContact }) {


  const contacts = [
    { name: 'Jack Smith', id: 1 },
    { name: 'Johnny Park', id: 2 },
    { name: 'Jane Johnson', id: 3 },
    { name: 'Mary Jackson', id: 4 },
  ];

  const handleSelectContact = (contact) => {
    if (!localStorage.getItem('user')) {
      alert('You did not sign in');
    } else {
      setActiveContact(contact);
    }
  };

  return (
    <div className="chat-list">
      <h2>DMs</h2>
      {contacts.map((contact) => (
        <div key={contact.id}
            className={`chat-contact ${activeContact && activeContact.id === contact.id ? 'active' : ''}`}
            onClick={() => setActiveContact(contact)}>
          <img src={profile} alt="profile" width='50px'></img>
          <div class='contact-item'>
            {contact.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
