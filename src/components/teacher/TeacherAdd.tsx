import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Student } from "../../models/Student";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
// import { Flight } from "../../models/Flight";
// import { Airline } from "../../models/Airline";
import { Teacher } from "../../models/Teacher";
import { BACKEND_API_URL } from "../../constants";

export const TeacherAdd = () => {
    const navigate = useNavigate();

    const [teacher, setTeacher] = useState<Teacher>({
        name: "",
        address: "",
        age: 0,
        phone: "",
        email: "",
        content: [],
        id: 0,
    });

    const addTeacher = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {

            await axios.post(`${BACKEND_API_URL}/teachers/`, teacher);
            navigate("/teachers");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <h1>Add Teacher</h1>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/teachers`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addTeacher}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setTeacher({ ...teacher, name: event.target.value })}
                        />
                        <TextField
                            id="address"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setTeacher({ ...teacher, address: event.target.value })}
                        />
                        <TextField
                            id="age"
                            label="Age"
                            variant="outlined"
                            fullWidth
                            type="number"
                            sx={{ mb: 2 }}
                            onChange={(event) => setTeacher({ ...teacher, age: parseInt(event.target.value) })}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                        />
                        <TextField
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setTeacher({ ...teacher, phone: event.target.value })}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setTeacher({ ...teacher, email: event.target.value})}
                        />


                        <Button type="submit">Add Teacher</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};