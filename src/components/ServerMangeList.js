// ServerMangeList.js
import React from 'react';
import ChannelList from './Channellist';
import GroupList from './Grouplist';
import ChatList from './ChatList';
import "../CSS/ServerMangeList.css";

function ServerMangeList({ onChannelSelect, course, setActiveContact, onChannelDeletion, contacts, setContacts, onDeleteContact,role,userId }) {

    return (
        <div className="menu-list">
            <h2>{removeCourseIdFromTitle(course.title)}</h2>
            <ChannelList onChannelSelect={onChannelSelect} courseId={course.course_id} onChannelDeletion={onChannelDeletion} role={role}  />
            <GroupList onChannelSelect={onChannelSelect} courseId={course.course_id} onChannelDeletion={onChannelDeletion} groupRole = {role}/>
            <ChatList contacts={contacts} setActiveContact={setActiveContact} onDeleteContact={onDeleteContact} userId = {userId} />
        </div>
    );
}

function removeCourseIdFromTitle(courseTitle) {
    let titleParts = courseTitle.split(' ');
    titleParts.pop(); 
    return titleParts.join(' '); 
}

export default ServerMangeList;
