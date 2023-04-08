import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppHome } from './components/Home'
import { AppMenu } from './components/Menu'
// import { AllCourses } from './components/course/CourseShowAll'
// import { CourseDetails } from './components/course/CourseDetails'
// import { CourseAdd } from './components/course/CourseAdd'
// import { CourseDelete } from './components/course/CourseDelete'
// import { CourseEdit } from './components/course/CourseEdit'
// import { AllStudents } from './components/student/StudentShowAll'
// import { StudentDetails } from './components/student/StudentDetails'
// import { StudentDelete } from './components/student/StudentDelete'
// import { StudentAdd } from './components/student/StudentAdd'
import { AllTeachers } from './components/teacher/TeacherShowAll'
import { TeacherDetails } from './components/teacher/TeacherDetails'
import { TeacherDelete } from './components/teacher/TeacherDelete'
import { TeacherAdd } from './components/teacher/TeacherAdd'
import { TeacherEdit } from './components/teacher/TeacherEdit'
import { TeachersByAvgStudentAge } from './components/teacher/TeacherByAvgStudentAge'
// import { AllCourseStudents } from './components/courseStudent/courseStudentShowAll'
// import { CourseStudentAdd } from './components/courseStudent/courseStudentAdd'
// import { CourseStudentEdit } from './components/courseStudent/courseStudentEdit'
// import { CourseStudentDetails } from './components/courseStudent/courseStudentDetails'
// import { CourseStudentDelete } from './components/courseStudent/courseStudentDelete'


function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <Router>
        <AppMenu />
        <Routes>
          {/* course */}
          {/* <Route path="/" element={<AppHome />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/:courseId/details" element={<CourseDetails />} />
          <Route path="/courses/:courseId/edit" element={<CourseEdit />} />
          <Route path="/courses/:courseId/delete" element={<CourseDelete />} />
          <Route path="/courses/add" element={<CourseAdd />} /> */}

          {/* student */}
          {/* <Route path="/students" element={<AllStudents />} />
          <Route path="/students/:studentId/details" element={<StudentDetails />} />
          <Route path="/students/:studentId/delete" element={<StudentDelete />} />
          <Route path="/students/add" element={<StudentAdd />} /> */}

          {/* teacher */}
          <Route path="/teachers/" element={<AllTeachers />} />
          <Route path="/teachers/:teacherId/details/" element={<TeacherDetails />} />
          <Route path="/teachers/:teacherId/delete/" element={<TeacherDelete />} />
          <Route path="/teachers/:teacherId/edit/" element={<TeacherEdit />} />
          <Route path="/teachers/add/" element={<TeacherAdd />} />
          <Route path="/teachers/avgStudentAge/" element={<TeachersByAvgStudentAge />} />

          {/* courseStudent
          <Route path="/courseStudents" element={<AllcourseStudents />} />
          <Route path="/courseStudents/:courseStudentId/details" element={<courseStudentDetails />} />
          <Route path="/courseStudents/:courseStudentId/delete" element={<courseStudentDelete />} />
          <Route path="/courseStudents/:courseStudentId/edit" element={<courseStudentEdit />} />
          <Route path="/courseStudents/add" element={<courseStudentAdd   />} /> */}
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App