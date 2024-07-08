import { Box, Button, Typography, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router";

const DashBoard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);

  useEffect(() => {
    // Fetch user info and attempted questions
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const headers = { Authorization: `Bearer ${token}` }; // Set authorization header

        // Replace with your actual endpoint to fetch user info
        const userInfoResponse = await axios.get(
          `https://dsa-track-backend.onrender.com/user/info`,
          { headers }
        );
        setUser(userInfoResponse.data);
        console.log(userInfoResponse.data);

        // Replace with your actual endpoint to fetch attempted questions
        // const attemptedQuestionsResponse = await axios.get(
        //   "/questions/attempted",
        //   { headers }
        // );
        // setAttemptedQuestions(attemptedQuestionsResponse.data);
      } catch (error) {
        console.error(
          "Error fetching user info or attempted questions:",
          error
        );
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      <Box>
        <Header />
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/home");
          }}
          style={{
            top: "20px",
            position: "absolute",
            left: "30px",
          }}
        >
          Home
        </Button>
      </Box>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        mt="80px"
        alignItems="center"
      >
        <Avatar
          alt={user.username}
          src="/static/images/avatar/1.jpg" // Replace with actual image source if available
          sx={{ width: 100, height: 100, color : '#2F3C7E'}}
        />
        <Typography
          sx={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: "600",
            fontSize: "25px",
            color : '#2F3C7E'
          }}
          marginTop={3}
        >
          {user.username || "yashvardhan"}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: "400",
            fontSize: "15px",
            color :'#2F3C7E'
          }}
        >
          {user.email || "yash@gmail.com"}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashBoard;
