import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Link } from '@mui/material';
import signupImage from '../Images/signupImage.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Simple password validation (minimum 6 characters)
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post(`https://dsa-track-backend.onrender.com/entry/login`, { email, password });
      console.log('tokn : ', response.data)
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        setPasswordError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error', error);
      setPasswordError('Failed to login. Please try again.');
    }
  };

  const linkClicked = () => {
    navigate('/entry/SignUp');
  };

  return (
    <Box
      height='100vh'
      width='100vw'
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{
        backgroundImage: `url(${signupImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        position='relative'
        sx={{
          height: { xs: '350px', md: '350px' },
          width: { xs: '250px', md: '400px' },
          border: 'solid 1px black',
          borderRadius: '25px',
          backgroundColor: 'rgba(250, 249, 246, 0.8)',
          boxShadow: 10,
          padding: '20px',
        }}
      >
        <Typography
          sx={{
            color: '#AD2A1A',
            fontSize: '30px',
            fontWeight: '700',
            fontFamily: "'Oswald', sans-serif",
            position: 'absolute',
            top: '20px'
          }}
        >
          Login
        </Typography>
        <TextField
          placeholder='Email Id'
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          sx={{
            position: 'absolute',
            top: '85px',
            width: { xs: '200px', md: '350px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}
        />
        <TextField
          placeholder='Password'
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          sx={{
            position: 'absolute',
            top: '160px',
            width: { xs: '200px', md: '350px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}
        />
        <Button
          onClick={handleLogin}
          sx={{
            position: 'absolute',
            top: '240px',
            height: '40px',
            width: '100px',
            border: 'solid 1px #AD2A1A',
            backgroundColor: '#AD2A1A',
            color: 'white',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: '#AD2A1A',
            },
            transition: 'transform 0.2s',
          }}
        >
          Login
        </Button>
        <Typography
          color='black'
          sx={{
            position: 'absolute',
            top: '300px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          New User? {' '}
          <Link
            onClick={linkClicked}
            sx={{
              color: '#AD2A1A',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
