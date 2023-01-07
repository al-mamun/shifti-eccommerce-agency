/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from 'layouts/Main';
import Container from 'components/Container';
import ProductTable from './components/ProductTable/ProductTable';

const Cart =  (): JSX.Element => {
const theme = useTheme();


  return (
    <Main>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: theme.palette.alternate.main,
          backgroundImage: `linear-gradient(120deg, ${theme.palette.alternate.dark} 0%, ${theme.palette.background.paper} 100%)`,
          marginTop: -13,
          paddingTop: 13,
        }}
      >
        
      </Box>
      
     
      <Container>
       <ProductTable/>
      </Container>
    </Main>
  );
};

export default Cart;
