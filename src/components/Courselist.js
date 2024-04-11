
import React from 'react';
import "../CSS/courselist.css"

const CourseList = ({ student }) => {
  return (
    <div className="course-list">
      {student.courses.map(course => (
        <div className="courses-preview" key={course.course_id}>
          <h2>{course.title}</h2>
          <p>{course.status} | {course.professor} | {course.info}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
