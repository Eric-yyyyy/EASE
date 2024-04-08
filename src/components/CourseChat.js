import React from 'react';

function ChatServer({ contact }) {
  // Return null or some placeholder if contact is null
  if (!contact) {
    return <div className="chat-server">Please select a contact to chat with.</div>;
  }

  // Fetch and display messages for the active contact
  return (
    <div className="chat-server">
      <h2>Chat with {contact.name}</h2>
      {/* Messages go here */}
    </div>
  );
}

export default ChatServer;
