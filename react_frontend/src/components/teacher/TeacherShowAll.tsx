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
import { Teacher } from "../../models/Teacher";
import { BACKEND_API_URL } from "../../constants";

export const AllTeachers = () => {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);


  useEffect(() => {
      setLoading(true);
      fetch(`${BACKEND_API_URL}/teachers/`)
          .then((response) => response.json())
          .then((data) => {
              setTeachers(data);
              setLoading(false);
          });
  }, []);

  const handleSort = (key: keyof Teacher) => {
    const sortedTeachers = [...teachers].sort((a, b) => {
      if ((a[key] as any) === undefined || (b[key] as any) === undefined) return 0;
      if ((a[key] as any) < (b[key] as any)) return -1;
      if ((a[key] as any) > (b[key] as any)) return 1;
      return 0;
    });
    setTeachers(sortedTeachers);
  };
  
  


  return (
      <Container>
          <h1 style={{ margin: "100px 0 30px 0" }}>All teachers</h1>
          {loading && <CircularProgress />}
          {!loading && teachers.length === 0 && <p>No teachers found</p>}
          {!loading && (
              <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/add`}>
                  <Tooltip title="Add a new teacher" arrow>
                      <AddIcon color="primary" />
                  </Tooltip>
              </IconButton>
          )}
          {!loading && teachers.length > 0 && (
            //   <TableContainer component={Paper}>
            //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
            //           <TableHead>
            //               <TableRow>
            //                   <TableCell>#</TableCell>
            //                   <TableCell align="center">Name</TableCell>
            //                   <TableCell align="center">Address</TableCell>
            //                   <TableCell align="center">Phone</TableCell>
            //                   <TableCell align="center">Age</TableCell>
            //                   <TableCell align="center">Email</TableCell>
            //               </TableRow>
            //           </TableHead>
            //           <TableBody>
            //               {teachers.map((teacher, index) => (
            //                   <TableRow key={teacher.id}>
            //                       <TableCell component="th" scope="row">
            //                           {index + 1}
            //                       </TableCell>
            //                       <TableCell align="center">{teacher.name}</TableCell>
            //                       <TableCell align="center">{teacher.address}</TableCell>
            //                       <TableCell align="center">{teacher.phone}</TableCell>
            //                       <TableCell align="center">{teacher.age}</TableCell>
            //                       <TableCell align="center">{teacher.email}</TableCell>
                                  
            //                       <TableCell align="center">
            //                           <IconButton
            //                               component={Link}
            //                               sx={{ mr: 3 }}
            //                               to={`/teachers/${teacher.id}/details`}>
            //                               <Tooltip title="View teacher details" arrow>
            //                                   <ReadMoreIcon color="primary" />
            //                               </Tooltip>
            //                           </IconButton>

            //                           <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/${teacher.id}/edit`}>
            //                               <EditIcon />
            //                           </IconButton>

            //                           <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers/${teacher.id}/delete`} >
            //                               <DeleteForeverIcon sx={{ color: "red" }} />
            //                           </IconButton>
            //                       </TableCell>
            //                   </TableRow>
            //               ))}
            //           </TableBody>
            //       </Table>
            //   </TableContainer>
            <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell align="center">
          <Button onClick={() => handleSort("name")}>Name</Button>
        </TableCell>
        <TableCell align="center">
          <Button onClick={() => handleSort("address")}>Address</Button>
        </TableCell>
        <TableCell align="center">
          <Button onClick={() => handleSort("phone")}>Phone</Button>
        </TableCell>
        <TableCell align="center">
          <Button onClick={() => handleSort("age")}>Age</Button>
        </TableCell>
        <TableCell align="center">
          <Button onClick={() => handleSort("email")}>Email</Button>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {teachers.map((teacher, index) => (
        <TableRow key={teacher.id}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell align="center">{teacher.name}</TableCell>
          <TableCell align="center">{teacher.address}</TableCell>
          <TableCell align="center">{teacher.phone}</TableCell>
          <TableCell align="center">{teacher.age}</TableCell>
          <TableCell align="center">{teacher.email}</TableCell>
          <TableCell align="center">
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/teachers/${teacher.id}/details`}
            >
              <Tooltip title="View teacher details" arrow>
                <ReadMoreIcon color="primary" />
              </Tooltip>
            </IconButton>
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/teachers/${teacher.id}/edit`}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              component={Link}
              sx={{ mr: 3 }}
              to={`/teachers/${teacher.id}/delete`}
            >
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

//           )}
//       </Container>
//   );
// };
