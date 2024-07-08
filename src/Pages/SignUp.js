import React, { useState } from "react";
import { Box, TextField, Typography, Button, Link } from "@mui/material";
import signupImage from "../Images/signupImage.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Simple password validation (minimum 6 characters)
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // Proceed with registration
    try {
      const response = await axios.post(`https://dsa-track-backend.onrender.com/entry/signup`, { username, email, password });
      if (response.status === 201) {
        console.log("Registration successful", response.data);
        setEmail("");
        setPassword("");
        setUsername("");
        
        // Check for token in the response
        if (response.data.token) {
          // Save the token to local storage (or any other secure storage)
          localStorage.setItem('token', response.data.token);
          // Navigate to the home page
          navigate('/entry/login');
        } else {
          // Handle case where token is not present in the response
          console.error("Token not received in response");
        }
      }
    } catch (error) {
      console.error("Registration error", error);
      if (error.response && error.response.data) {
        // Handle specific registration errors
        if (error.response.data.err.includes("email")) {
          setEmailError("Email is already registered");
        } else if (error.response.data.err.includes("username")) {
          setEmailError("Username is already taken");
        } else {
          setEmailError("Registration failed. Please try again.");
        }
      }
    }
  };

  const linkClicked = () => {
    navigate("/entry/login");
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url(${signupImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        position="relative"
        sx={{
          height: { xs: "450px", md: "460px" },
          width: { xs: "250px", md: "400px" },
          border: "solid 1px black",
          borderRadius: "25px",
          backgroundColor: "rgba(250, 249, 246, 0.8)",
          boxShadow: "10",
          position: "relative", // To ensure it is above the blurred background
          zIndex: 1, // Ensure it is on top of the background
          padding: "20px",
        }}
      >
        <Typography
          sx={{
            color: "#AD2A1A",
            fontSize: "30px",
            fontWeight: "700",
            fontFamily: "'Oswald',sans-serif",
            position: "absolute",
            top: "30px",
          }}
        >
          Sign Up
        </Typography>
        <TextField
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            position: "absolute",
            top: "100px",
            width: { xs: "200px", md: "350px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
        />
        <TextField
          placeholder="Email Id"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          sx={{
            position: "absolute",
            top: "180px",
            width: { xs: "200px", md: "350px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
        />
        <TextField
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          sx={{
            position: "absolute",
            top: "260px",
            width: { xs: "200px", md: "350px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
        />
        <Button
          onClick={handleRegister}
          sx={{
            position: "absolute",
            top: "350px",
            height: "40px",
            width: "100px",
            border: "solid 1px #AD2A1A",
            backgroundColor: "#AD2A1A",
            color: "white",
            "&:hover": {
              transform: "scale(1.1)",
              backgroundColor: "#AD2A1A",
            },
            transition: "transform 0.2s",
          }}
        >
          Register
        </Button>
        <Typography
          color="black"
          sx={{
            position: "absolute",
            top: "415px",
          }}
        >
          Already Registered?{" "}
          <Link
            onClick={linkClicked}
            sx={{
              color: "#AD2A1A",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
