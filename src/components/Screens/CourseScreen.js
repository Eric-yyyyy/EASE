
import CourseList from "../Courselist";
import useFetch from "../useFetch";

const Course = () => {
  const { error, isPending, data: students } = useFetch('http://localhost:8000/students')

  return (
    <div className="Course">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { students && <CourseList students={students} /> }
    </div>
  );
}
 
export default Course;
