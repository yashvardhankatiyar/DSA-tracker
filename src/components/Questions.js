import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import Ques from './Ques';
import { Array, Greedy, DP, BSQ, Heap, Recursion, LinkedList, BinaryTree, BinarySearchTree, SQT, Backtracking, Graph } from '../data/data'; 
import { useNavigate } from 'react-router';

const Questions = ({ topic }) => {
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);

  useEffect(() => {
    switch (topic) {
      case 'Array':
        setQuestionsArray(Array);
        break;
      case 'Greedy':
        setQuestionsArray(Greedy);
        break;
      case 'DP':
        setQuestionsArray(DP);
        break;
      case 'BSQ':
        setQuestionsArray(BSQ);
        break;
      case 'Heap':
        setQuestionsArray(Heap);
        break;
      case 'Recursion':
        setQuestionsArray(Recursion);
        break;
      case 'LinkedList':
        setQuestionsArray(LinkedList);
        break;
      case 'BinaryTree':
        setQuestionsArray(BinaryTree);
        break;
      case 'BinarySearchTree':
        setQuestionsArray(BinarySearchTree);
        break;
      case 'SQT':
        setQuestionsArray(SQT);
        break;
      case 'Backtracking':
        setQuestionsArray(Backtracking);
        break;
      case 'Graph':
        setQuestionsArray(Graph);
        break;
      default:
        break;
    }
  }, [topic]);

  const updateQuestionStatus = (id, status) => {
    const updatedQuestions = questionsArray.map(question =>
      question.ID === id ? { ...question, status } : question
    );
    setQuestionsArray(updatedQuestions);
  };

  useEffect(() => {
    const attempted = () => {
      const attemptedQuestions = questionsArray.filter(question => question.status === 'complete');
      setAttemptedCount(attemptedQuestions.length);
    }
  
    attempted();
  }, [questionsArray]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }

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
              key={info.ID}
              id={info.ID}
              Q={info.Q}
              link={info.link}
              status={info.status}
              done={info.done}
              updateStatus={updateQuestionStatus}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Questions;
