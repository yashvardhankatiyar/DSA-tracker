import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { questionArrays } from '../data/data';
import Card from './Card';

const Topic = () => {
  

  return (
    <Box margin="50px" display="flex" flexWrap="wrap" justifyContent="center">
      {questionArrays.map((info, index) => (
        <Card info={info} index={index} key={index}/>
      ))}
    </Box>
  );
};

export default Topic;
