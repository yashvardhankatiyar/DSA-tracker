import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import Ques from './Ques';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Questions = ({ topic }) => {
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const headers = { Authorization: `Bearer ${token}` }; 

        const response = await axios.get(`https://dsa-track-backend.onrender.com/Questions`, {headers});
        const newQ = response.data.filter(Q => Q.type === topic);
        setQuestionsArray(newQ);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchData();
  }, [topic]);

  const editData = async (id) => {
    try {
      const response = await axios.patch(`https://dsa-track-backend.onrender.com/Questions/${id}`);
      const updatedQuestion = response.data;

      const newone = questionsArray.map(q => q._id === id ? updatedQuestion : q);
      setQuestionsArray(newone);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const updateQuestionStatus = (id, status) => {
    editData(id);
  };

  useEffect(() => {
    const attempted = () => {
      const attemptedQuestions = questionsArray.filter(question => question.status === 'complete');
      setAttemptedCount(attemptedQuestions.length);
    };
    attempted();
  }, [questionsArray]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  };

  const totalQues = questionsArray.length;

  return (
    <Box
      display='flex'
      justifyContent='center'
      width='100%'
      position='relative'
    >
      <Button 
        onClick={handleClick}
        className='topic-Box'
        sx={{
          margin: '30px',
          height: '30px',
          width: '45px',
          left: '10px',
          backgroundColor: '#161F38',
          position: 'absolute'
        }}
      >
        Home
      </Button>
      <Typography
        position='absolute'
        sx={{
          top: '2%',
          right: '15%',
          margin: '20px',
          fontWeight: '600',
          fontSize: '25px',
          fontFamily: "'Poppins' sans-serif",
          color: '#808080'
        }}
      >
        Attempted: {attemptedCount}/{totalQues}
      </Typography>
      <Stack mt='20px'>
        <Typography
          fontSize='35px'
          fontFamily="'Poppins', sans-serif"
          fontWeight='900'
          display='flex'
          justifyContent='center'
          color='#161F38'
        >
          {topic}
        </Typography>
        <Stack
          mt='40px'
          direction='row'
          display='flex'
          flexWrap='wrap'
          justifyContent='center'
        >
          {questionsArray.map((info) => (
            <Ques
              key={info._id}
              id={info._id}
              Q={info.question}
              link={info.link}
              status={info.status}
              updateStatus={updateQuestionStatus}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Questions;
