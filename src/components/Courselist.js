import { Link } from 'react-router-dom';
import '../CSS/courselist.css'
const CourseList = ({ students }) => {
    return (
      <div className="course-list">
        {students.map(student => (
          student.courses.map(course => (
            <div className="courses-preview" key={course.course_id}>
              <p>{course.course_id}</p>
              <h2>{course.title}</h2>
              <p>{course.status} | {course.professor} | {course.info}</p>
            </div>
          ))
        ))}
      </div>
    );
  }
  
 
export default CourseList;