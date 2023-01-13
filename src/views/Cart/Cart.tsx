import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import Main from '../../layouts/Main';
import Container from 'components/Container';

import { Orders, SummeryBox } from './components';

const Cart = (): JSX.Element => {
  return (
    <Main>
      <Container>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" fontWeight={700} marginBottom={4}>
                Shopping cart
              </Typography>
              <Orders />
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'alternate.main',
                  padding: { xs: 2, sm: 4 },
                }}
              >
                <Typography variant="h6" fontWeight={700} marginBottom={4}>
                  Order summary
                </Typography>
                <SummeryBox />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Main>
  );
};

export default Cart;
