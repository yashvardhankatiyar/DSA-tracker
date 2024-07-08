import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Card from './Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Topic = () => {
  const [questionArrays, setQuestionsArray] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const headers = { Authorization: `Bearer ${token}` }; // Set authorization header

        const response = await axios.get(`https://dsa-track-backend.onrender.com/Topics`, { headers });
        setQuestionsArray(response.data); // Set the data directly
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        if (error.response && error.response.status === 401) {
          // Redirect to login page if unauthorized
          navigate('/entry/login');
        }
      }
    };

    fetchTopics();
  }, [navigate]); // Dependency array includes navigate

  return (
    <Box margin="50px" display="flex" flexWrap="wrap" justifyContent="center">
      {questionArrays.map((info, index) => (
        <Card info={info} index={index} key={index} />
      ))}
    </Box>
  );
};

export default Topic;
