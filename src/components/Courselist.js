import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/courselist.css";

const CourseList = ({ student }) => {
  const navigate = useNavigate();

  const goToCourseServerScreen = (courseId) => {
    navigate(`/courseserver/${courseId}`);
  };

  return (
    <div className="course-list">
      {student.courses.map(course => (
        <div 
          className="courses-preview" 
          key={course.course_id}
          onClick={() => goToCourseServerScreen(course.course_id)} 
        >
          <h2>{course.title}</h2>
          <p>{course.status} | {course.professor} | {course.info}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
