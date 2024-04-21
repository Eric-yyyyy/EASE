import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import "../CSS/courselist.css";

const CourseList = ({ student }) => {
  const navigate = useNavigate();
  const [selectedCourseId, setSelectedCourseId] = useState(null); 
  

  const goToCourseServerScreen = (course) => {
    setSelectedCourseId(course.course_id); 
    navigate(`/courseserver/${course.course_id}`, { state: { course } });
  };

 
  const isActiveCourse = (courseId) => {
    return selectedCourseId === courseId;
  };

  const activeStyle = {
    backgroundColor: '#DCF7FF',
    color: '#00B2EB',
    boxShadow: 'none',
    border: '3px solid #00B2EB',
  };

  return (
    <div className="course-list">
      {student.courses.map(course => (
        <div 
          className="courses-preview tooltip-container" 
          key={course.course_id}
          onClick={() => goToCourseServerScreen(course)} 
        >
          <h2>{course.course_id.substring(0,course.course_id.indexOf('.'))+"..."}</h2>
          <p>{course.status} | {course.professor} | {course.info}</p>

         
          <span className="tooltip-text">
            {course.title} 
          </span>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
