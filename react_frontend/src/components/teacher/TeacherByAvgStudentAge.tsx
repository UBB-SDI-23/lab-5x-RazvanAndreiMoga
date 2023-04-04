import { Card, CardActions, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import { Student } from "../../models/Student";
// import { Airline } from "../../models/Airline";
// import { AirlineCapacity } from "../../models/AirlineCapacity";
import { Teacher } from "../../models/Teacher";
import { ArrowBack } from "@mui/icons-material";
import { useState, useEffect } from 'react';
import { BACKEND_API_URL } from "../../constants";



export const TeachersByAvgStudentAge = () => {
    const [loading, setLoading] = useState(false);
    const { teacherId } = useParams();
    const [teachersByAvgStudentAge, setTeachersByAvgStudentAge] = useState<Teacher[]>([]);
  // ...


    useEffect(() => {
    // setLoading(true);
    // fetch(`${BACKEND_API_URL}/teachers/`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTeachers(data);
    //     setLoading(false);
    //   });
        setLoading(true);
        fetch(`${BACKEND_API_URL}/tutors-by-avg-student-age/`)
        .then((response) => response.json())
        .then((data) => {
                setTeachersByAvgStudentAge(data);
                setLoading(false);
              });
    }, []);

  return (
    <Container>
      {!loading && teachersByAvgStudentAge.length > 0 && (
        <>
          <h2 style={{ margin: "30px 0" }}>Teachers by Average Student Age</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="teachers by avg student age table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Average Student Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachersByAvgStudentAge.map((teacher, index) => (
                  <TableRow key={teacher.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{teacher.name}</TableCell>
                    <TableCell align="center">
                        {(teacher.student_avg_age ?? 0).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};