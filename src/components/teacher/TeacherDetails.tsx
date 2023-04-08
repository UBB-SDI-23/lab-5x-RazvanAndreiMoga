import { Card, CardActions, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import { Student } from "../../models/Student";
// import { Airline } from "../../models/Airline";
// import { AirlineCapacity } from "../../models/AirlineCapacity";
import { Teacher } from "../../models/Teacher";
import { ArrowBack } from "@mui/icons-material";

import { BACKEND_API_URL } from "../../constants";
export const TeacherDetails = () => {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState<Teacher>();
    //const [teacherCapacity, setTeacherCapacity] = useState<Teacher>();

    useEffect(() => {
        const fetchTeacher = async () => {
            const response = await fetch(`${BACKEND_API_URL}/teachers/${teacherId}`);
            //const response1 = await fetch(`${BACKEND_API_URL}/teachers/${teacherId}/averagePrice`);
            const teacher = await response.json();
            //const teacherCapacity = await response1.json();

            setTeacher(teacher);
            //setTeacherCapacity(teacherCapacity);
        };
        fetchTeacher();
    }, [teacherId]);

    return (
        <Container sx={{ marginTop: "2rem" }}>
            <Card sx={{ maxWidth: "800px", margin: "auto" }}>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers`}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4" gutterBottom>
                        Teacher Details
                    </Typography>
                    <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Name
                                    </TableCell>
                                    <TableCell align="right">
                                        {teacher?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Age
                                    </TableCell>
                                    <TableCell align="right">
                                        {teacher?.age}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Address
                                    </TableCell>
                                    <TableCell align="right">
                                        {teacher?.address}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Phone
                                    </TableCell>
                                    <TableCell align="right">
                                        {teacher?.phone}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Email
                                    </TableCell>
                                    <TableCell align="right">
                                        {teacher?.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Students
                                    </TableCell>
                                    <TableCell align="right">
                                    {teacher?.content.map((student, index) => (
                                        <div key={index}>{student.name}</div>
                                    ))}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                </CardContent>
                <CardActions sx={{ borderTop: "1px solid #E0E0E0", justifyContent: "center" }}>
                    <IconButton component={Link} sx={{ mr: 3, fontSize: "16px", color: "#444", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/teachers/${teacherId}/edit`} >
                        <EditIcon sx={{ fontSize: "20px", mr: "8px" }} /> Edit Profile
                    </IconButton>

                    <IconButton component={Link} sx={{ fontSize: "16px", borderRadius: "12px", "&:hover": { backgroundColor: "#E0E0E0" } }} to={`/teachers/${teacherId}/delete`} >
                        <DeleteForeverIcon sx={{ fontSize: "20px", mr: "8px", color: "#f44336" }} /> Delete Account
                    </IconButton>


                </CardActions>
            </Card>
        </Container >
    );
};