
import React from 'react';
import '../CSS/UserList.css'

import { useState } from 'react';


function ChatList({ activeContact, setActiveContact }) {
    
  
    const contacts = [
      { name: 'Jack', id: 1 },
      { name: 'Johnny', id: 2 },
      { name: 'Jane', id: 3 },
      { name: 'Mary', id: 4 },
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
      <h2>Contact List</h2>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`contact-item ${activeContact && activeContact.id === contact.id ? 'active' : ''}`}
          onClick={() => setActiveContact(contact)}
        >
          {contact.name}
        </div>
      ))}
    </div>
  );
  }

export default ChatList;
