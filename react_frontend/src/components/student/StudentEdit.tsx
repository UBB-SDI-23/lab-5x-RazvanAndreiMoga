import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../models/Booking";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Student } from "../../models/Student";
import { BACKEND_API_URL } from "../../constants";
export const StudentEdit = () => {
    const navigate = useNavigate();
    const { studentId } = useParams();
	
    const [student, setStudent] = useState<Student>({ 
        name: "",
        age: 0,
        address: "",
        phone: "",
        tutor: Teacher,
    });

	useEffect(() => {
		const fetchStudent = async () => {
			const response = await fetch(`${BACKEND_API_URL}/students/${studentId}`);
			const student = await response.json();
			setStudent(student);
		};
		fetchStudent();
	}, [studentId]);

    const updateStudent = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/student/${studentId}`, student);
            navigate("/students");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/students`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateStudent}>                 
                    <TextField
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={student.firstName}
                            onChange={(event) => setStudent({ ...student, firstName: event.target.value })}
                        />
                        <TextField
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={student.lastName}
                            onChange={(event) => setStudent({ ...student, lastName: event.target.value })}
                        />
                        <TextField
                            id="date-of-birth"
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            type="date"
                            sx={{ mb: 2 }}
                            value={student.dateOfBirth}
                            onChange={(event) => setStudent({ ...student, dateOfBirth: event.target.value })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="nationality"
                            label="Nationality"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={student.nationality}
                            onChange={(event) => setStudent({ ...student, nationality: event.target.value })}
                        />
                        <TextField
                            id="passport-number"
                            label="Passport Number"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={student.passportNumber}
                            onChange={(event) => setStudent({ ...student, passportNumber: event.target.value})}
                        />

                        <Button type="submit">Update Student</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};
