import { useEffect, useState } from "react"
import { Course } from "../../models/Course";



export const CourseShowAll = () => {
    const [courses, setCourses] = useState([])
    useEffect(() => {
    fetch("http://localhost:8000/courses").then((res) => res.json()).then((data) => setCourses(data));
    }, []);
    return (
      <div className="App">
        <h1>Courses list</h1>
        <table>
          <tr>  
            <th>#</th>
            <th>Course name</th>
            <th>Course description</th>
            <th>Course credits</th>
          </tr>
          {courses.map((course: Course, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.credits}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
  
  