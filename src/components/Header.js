import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored token or user info
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/entry/login');
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100%'
      position='relative'
      padding='10px 0'
    >
      <Typography 
        fontSize='30px'
        fontWeight='700'
        fontFamily="'Poppins', sans-serif"
        color = "#2F3C7E"
      >
        DSA Questions Tracker
      </Typography>
      <Button 
        variant="outlined" 
        onClick={handleLogout}
        style={{
          position: 'absolute',
          right: '30px'
        }}
      >
        Logout
      </Button>
      <CiUser 
        fontSize='35px'
        onClick={() => {
          navigate('/dashboard')
        }}
        style={{
          position: 'absolute',
          right: '150px',
          cursor: 'pointer',
          border : 'solid 1px',
          borderRadius : '10px',
          color : '#2F3C7E'
        }}
      />
    </Box>
  );
};

export default Header;
