
import React from 'react';
import '../CSS/UserList.css'

import { useState } from 'react';


function ChatList({ activeContact, setActiveContact }) {
    // No need for selectedContact state here as it's passed down from parent
  
    const contacts = [
      { name: 'Jack', id: 1 },
      { name: 'Johnny', id: 2 },
      { name: 'Jane', id: 3 },
      { name: 'Mary', id: 4 },
    ];
  
    const handleSelectContact = (contact) => {
      setActiveContact(contact);
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
