import React, { useState, useEffect } from 'react';
import memberData from './member'; 

const MemberList = ({ courseId,onUserClick  }) => {
  const [members, setMembers] = useState(null);

  useEffect(() => {
    const courseMembers = memberData[courseId] || {
      instructor: { name: "anonymous" },
      TAs: [{ name: "anonymous" }, { name: "anonymous" }],
      students: new Array(10).fill({ name: "anonymous" }) 
    };
    setMembers(courseMembers);
  }, [courseId]);

  if (!members) {
    return <div>Loading members...</div>;
  }

  return (
    <div className="member-list">
      <h3>Instructors</h3>
      <div onClick={() => onUserClick(members.instructor)} className="member-name clickable">
        {members.instructor.name}
      </div>

      <h3>Teaching Assistants</h3>
    
      {members.TAs.map((ta, index) => (
        <div key={index} onClick={() => onUserClick(ta)} className="member-name clickable">
          {ta.name}
        </div>
      ))}

      <h3>Students</h3>
      {members.students.map((student, index) => (
        <div key={index} onClick={() => onUserClick(student)} className="member-name clickable">
          {student.name}
        </div>
      ))}
    </div>
  );
};

export default MemberList;
