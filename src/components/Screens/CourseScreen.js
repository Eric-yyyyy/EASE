
import React from 'react';
import CourseList from "../Courselist";
import useFetch from "../useFetch";

const CourseScreen = () => {
  const { error, isPending, data: students } = useFetch('http://localhost:8000/students');
  const user = JSON.parse(localStorage.getItem('user'));


  const loggedInStudent = students?.find(student => student.user_id === user?.user_id);

  return (
    <div className="course-screen">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {loggedInStudent ? <CourseList student={loggedInStudent} /> : <div>No courses found for this user.</div>}
    </div>
  );
};

export default CourseScreen;
