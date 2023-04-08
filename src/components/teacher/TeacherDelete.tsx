import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const TeacherDelete = () => {
	const { teacherId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/teachers/${teacherId}/`);

		navigate("/teachers");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();

		navigate("/teachers");
	};

	return (
		<Container >
			<Card >
				<CardContent >
					<IconButton component={Link} sx={{ mr: 3 }} to={`/teachers`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h3>Are you sure you want to delete this teacher?</h3>
				</CardContent>
				<CardActions >
					<Button onClick={handleDelete} sx={{ color: 'white', backgroundColor: 'red' }}>Delete</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>

	);
};