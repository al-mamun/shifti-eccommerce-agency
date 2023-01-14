/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable semi */
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { CartData } from 'context/CartContext';
import Button from '@mui/material/Button';
import { api } from 'api/config';
import { useNavigate } from 'react-router-dom';

const Billing = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const { setCardData, userData } = useContext(CartData);
  const navigate = useNavigate();
  // const {userData} = useContext(UserData);

  const onSubmit = (data) => {
    console.log(data);
    // setCardData(data);
    fetch(`${api}/api/place-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData?.token} `,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.id) {
          navigate('/order-complete');
        }
        // setCardData(data);
      });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12}>
            <Typography
              variant={'subtitle2'}
              sx={{ marginBottom: 2 }}
              fontWeight={700}
            >
              Enter your card number
            </Typography>
            <TextField
              label="Card number *"
              variant="outlined"
              name={'cardNumber'}
              {...register('cardNumber')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant={'subtitle2'}
              sx={{ marginBottom: 2 }}
              fontWeight={700}
            >
              Name on the card
            </Typography>
            <TextField
              label="Name *"
              variant="outlined"
              name={'fullName'}
              {...register('fullName')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant={'subtitle2'}
              sx={{ marginBottom: 2 }}
              fontWeight={700}
            >
              Month
            </Typography>
            <TextField
              label="Month *"
              variant="outlined"
              name={'month'}
              {...register('month')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant={'subtitle2'}
              sx={{ marginBottom: 2 }}
              fontWeight={700}
            >
              Year
            </Typography>
            <TextField
              label="year *"
              variant="outlined"
              name={'year'}
              {...register('year')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant={'subtitle2'}
              sx={{ marginBottom: 2 }}
              fontWeight={700}
            >
              CVV
            </Typography>
            <TextField
              label="Card CVV *"
              variant="outlined"
              name={'cvv'}
              {...register('cvv')}
              fullWidth
            />
          </Grid>

          <Box sx={{ mt: 3, ml: 5 }}>
            <Button
              type={'submit'}
              variant={'contained'}
              size={'large'}
              fullWidth
            >
              Place an order
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default Billing;
