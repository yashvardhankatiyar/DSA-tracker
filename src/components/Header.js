import { Box, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
    >
      <Typography fontSize='30px'
      fontWeight='500'
      fontFamily="'Poppins', sans-serif"
      >DSA Questions Tracker</Typography>
    </Box>
  );
};

export default Header;
