import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServerMange from '../ServerMangeList';
import CourseChatServer from '../CourseChatServer';
import ChatServer from '../ChatServer';
import MemberList from '../Memberlist';
import '../../CSS/CourseServerScreen.css';

function CourseServerScreen() {
    const location = useLocation();
    const { course } = location.state || {};

   
    const getStorageKey = () => `chat_contacts_${course ? course.course_id : 'default'}`;

    
    const [contacts, setContacts] = useState(() => {
        const key = getStorageKey();
        const storedContacts = localStorage.getItem(key);
        return storedContacts ? JSON.parse(storedContacts) : [];
    });

    const [selectedChannel, setSelectedChannel] = useState(null);
    const [activeContact, setActiveContact] = useState(null);
    const isLoggedIn = localStorage.getItem('user') !== null;

    
    useEffect(() => {
        const key = getStorageKey();
        const storedContacts = localStorage.getItem(key);
        setContacts(storedContacts ? JSON.parse(storedContacts) : []);
    }, [course]); 

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel);
        setActiveContact(null);
    };

    const handleChannelDeletion = (channelId) => {
        if (selectedChannel && channelId === selectedChannel.id) {
            setSelectedChannel(null);
        }
    };

    const handleUserClick = (user) => {
        if (!contacts.find(contact => contact.id === user.id)) {
            setContacts(prevContacts => [...prevContacts, user]);
        }
    };

    const handleDeleteContact = (contactId) => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    };

    // Save contacts to local storage whenever they change
    useEffect(() => {
        const key = getStorageKey();
        localStorage.setItem(key, JSON.stringify(contacts));
    }, [contacts]);

    return (
        <div className="course-server-screen">
            {isLoggedIn ? (
                <>
                    <div className="server-manage-list">
                        <ServerMange 
                            onChannelSelect={handleChannelSelect} 
                            setActiveContact={setActiveContact} 
                            course={course} 
                            onChannelDeletion={handleChannelDeletion} 
                            contacts={contacts} 
                            setContacts={setContacts}
                            onDeleteContact={handleDeleteContact}
                        />
                    </div>
                    <div className="course-chat-server">
                        {activeContact ? (
                            <ChatServer contact={activeContact} />
                        ) : (
                            <CourseChatServer selectedChannel={selectedChannel} />
                        )}
                    </div>
                    <div className="member-list-section">
                        {course && <MemberList courseId={course.course_id} onUserClick={handleUserClick} />}
                    </div>
                </>
            ) : (
                <p>Please log in to view this page.</p>
            )}
        </div>
    );
}

export default CourseServerScreen;
