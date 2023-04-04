import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
  Button,
  DialogActions,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Student } from "../../models/Student";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
// import { Courses } from "../../models/Course";
// import { Tutor } from "../../models/Teacher";
import { Student } from "../../models/Student";
import { BACKEND_API_URL } from "../../constants";

export const AllStudents = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);


  useEffect(() => {
      setLoading(true);
      fetch(`${BACKEND_API_URL}/students`)
          .then((response) => response.json())
          .then((data) => {
              setStudents(data);
              setLoading(false);
          });
  }, []);

  return (
      <Container>
          <h1 style={{ margin: "100px 0 30px 0" }}>All students</h1>
          {loading && <CircularProgress />}
          {!loading && students.length === 0 && <p>No students found</p>}
          {!loading && (
              <IconButton component={Link} sx={{ mr: 3 }} to={`/students/add`}>
                  <Tooltip title="Add a new student" arrow>
                      <AddIcon color="primary" />
                  </Tooltip>
              </IconButton>
          )}
          {!loading && students.length > 0 && (
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell>#</TableCell>
                              <TableCell align="center">Name</TableCell>
                              <TableCell align="center">Address</TableCell>
                              <TableCell align="center">Phone</TableCell>
                              <TableCell align="center">Age</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center">Tutor</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {students.map((student, index) => (
                              <TableRow key={student.id}>
                                  <TableCell component="th" scope="row">
                                      {index + 1}
                                  </TableCell>
                                  <TableCell align="center">{student.name}</TableCell>
                                  <TableCell align="center">{student.address}</TableCell>
                                  <TableCell align="center">{student.phone}</TableCell>
                                  <TableCell align="center">{student.age}</TableCell>
                                  <TableCell align="center">{student.email}</TableCell>
                                  <TableCell align="center">{student.tutor.id}</TableCell>
                                  
                                  <TableCell align="center">
                                      <IconButton
                                          component={Link}
                                          sx={{ mr: 3 }}
                                          to={`/students/${student.id}/details`}>
                                          <Tooltip title="View student details" arrow>
                                              <ReadMoreIcon color="primary" />
                                          </Tooltip>
                                      </IconButton>

                                      <IconButton component={Link} sx={{ mr: 3 }} to={`/students/${student.id}/edit`}>
                                          <EditIcon />
                                      </IconButton>

                                      <IconButton component={Link} sx={{ mr: 3 }} to={`/students/${student.id}/delete`} >
                                          <DeleteForeverIcon sx={{ color: "red" }} />
                                      </IconButton>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          )}
      </Container>
  );
};