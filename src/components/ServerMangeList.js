// ServerMangeList.js
import React from 'react';
import ChannelList from './Channellist';
import GroupList from './Grouplist';
import ChatList from './ChatList';
import "../CSS/ServerMangeList.css";

function ServerMangeList({ onChannelSelect, course, setActiveContact, onChannelDeletion, contacts, setContacts, onDeleteContact }) {
    const handleAddContact = (user) => {
        if (!contacts.find(contact => contact.id === user.id)) {
            setContacts([...contacts, user]);
        }
    };

    return (
        <div className="menu-list">
            <h2>{removeCourseIdFromTitle(course.title)}</h2>
            <ChannelList onChannelSelect={onChannelSelect} courseId={course.course_id} onChannelDeletion={onChannelDeletion}/>
            <GroupList onChannelSelect={onChannelSelect} courseId={course.course_id} onChannelDeletion={onChannelDeletion}/>
            <ChatList contacts={contacts} setActiveContact={setActiveContact} onDeleteContact={onDeleteContact} />
        </div>
    );
}

function removeCourseIdFromTitle(courseTitle) {
    let titleParts = courseTitle.split(' ');
    titleParts.pop(); 
    return titleParts.join(' '); 
}

export default ServerMangeList;
