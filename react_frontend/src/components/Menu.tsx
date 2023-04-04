import { Box, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Drawer } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
//import StudentIcon from "@mui/icons-material/Student";
// import teacherExtraIcon from "@mui/icons-material/teacherExtra";
import PermContactCalendar from '@mui/icons-material/PermContactCalendar';
import { useState } from "react";


const menuItems = [
//   {
//     text: "courses",
//     icon: <CourseIcon />,
//     path: "/courses"
//   },
  {
    text: "teachers",
    icon: <PermContactCalendar />,
    path: "/teachers/"
  },
  {
    text: "teachers by avg student age",
    icon: <PermContactCalendar />,
    path: "/teachers/avgStudentAge/"
  },
//   {
//     text: "teachers",
//     icon: <teacherSeatReclineExtraIcon />,
//     path: "/teachers"
//   },
//   {
//     text: "courseStudents",
//     icon: <SchoolIcon />,
//     path: "/courseStudents"
//   }
];

export const AppMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (isOpen: boolean | ((prevState: boolean) => boolean)) => () => {
    setIsDrawerOpen(isOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0"
      }}
    >

      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname.startsWith(item.path)}
            component={Link}
            to={item.path}
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, position: "fixed", top: 0, left: 0, backgroundColor: "#2326cc", width: '100%', color: 'white' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Teacher management
          </Typography>
        </Toolbar>
      </Box>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
};