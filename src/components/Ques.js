import { Box, Checkbox, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ques = ({ id, Q, link, status, updateStatus }) => {
  const [stat, setStat] = useState(status);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const headers = { Authorization: `Bearer ${token}` }; // Set authorization header

        const response = await axios.get(`https://dsa-track-backend.onrender.com/user/info`, { headers });
        const attemptedQuestions = response.data.attemptQuestion || [];
        if (attemptedQuestions.includes(id)) {
          setStat('complete');
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
        if (error.response && error.response.status === 401) {
          // Redirect to login page if unauthorized
          navigate('/entry/login');
        }
      }
    };
    fetchTopics();
  }, [id, navigate]);

  const handleCheckboxChange = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const newStatus = stat === 'Incomplete' ? 'complete' : 'Incomplete';
    
    try {
      await axios.patch('https://dsa-track-backend.onrender.com/user/updateAttemptedQuestions', 
        { questionId: id, status: newStatus }, 
        { headers }
      );
      setStat(newStatus);
    } catch (error) {
      console.error('Error updating attempted questions:', error);
    }
  };

  return (
    <Box
      margin='10px'
      height="120px"
      width="300px"
      border="4px solid black"
      borderRadius="10px"
      p='10px'
      position="relative"
      sx={{
        cursor: "pointer",
        textAlign: "center",
        backgroundColor: "#161F38",
      }}
      className='topic-Box'
    >
      <Link to={link} target="_blank" style={{ textDecoration: 'none' }}>
        <Typography
          fontSize="15px"
          mt='5px'
          fontWeight='600'
          fontFamily="'Poppins', sans-serif"
          color='white'
        >
          {Q}
        </Typography>
      </Link>
      <Typography
        fontSize="10px"
        fontFamily="'Poppins', sans-serif"
        color='white'
        sx={{
          fontWeight: '600',
          position: "absolute",
          bottom: '5px',
          left: '10px',
          textAlign: "left",
          textDecoration: 'none'
        }}
      >
        Status: {stat}
      </Typography>
      <Checkbox
        checked={stat === 'complete'}
        onChange={handleCheckboxChange}
        sx={{
          position: "absolute",
          bottom: '0px',
          right: "0px",
        }}
      />
    </Box>
  );
};

export default Ques;
