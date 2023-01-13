/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { api } from 'api/config';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Form = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (formDatas) => {
    fetch(`${api}/api/customer/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formDatas),
    })
      .then((res) => res.json())
      .then((data) => {
        reset(formDatas);
        if (data?.errors) {
          setErrorMessage(data?.errors);
          toast.error(data?.message, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          return;
        }
        setTimeout(() => {
          navigate('/signin-simple');
        }, 5000);
        toast.success(data?.msg, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  return (
    <Box>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Signup
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Create an account
        </Typography>
        <Typography color="text.secondary">
          Fill out the form to get started.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your first name
            </Typography>
            <TextField
              label="First name *"
              variant="outlined"
              name={'first_name'}
              fullWidth
              {...register('first_name')}
            />
            {errorMessage?.first_name && (
              <Alert sx={{ mt: 2 }} severity="error">
                {errorMessage?.first_name[0]}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your last name
            </Typography>
            <TextField
              label="Last name *"
              variant="outlined"
              name={'last_name'}
              fullWidth
              {...register('last_name')}
            />
            {errorMessage?.last_name && (
              <Alert sx={{ mt: 2 }} severity="error">
                {errorMessage?.last_name[0]}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your email
            </Typography>
            <TextField
              label="Email *"
              variant="outlined"
              name={'email'}
              fullWidth
              {...register('email')}
            />
            {errorMessage?.email && (
              <Alert sx={{ mt: 2 }} severity="error">
                {errorMessage?.email[0]}
              </Alert>
            )}
          </Grid>

          {/* <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
               Phone Number
            </Typography>
            <TextField
              label="Phone Number *"
              variant="outlined"
              name={'phone'}
              fullWidth
              {...register("phone")}
           
            />
            {errorMessage?.phone &&
            <Alert sx={{mt:2}} severity="error">{errorMessage?.phone[0]}</Alert>}
          </Grid> */}

          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your password
            </Typography>
            <TextField
              label="Password *"
              variant="outlined"
              name={'password'}
              type={'password'}
              fullWidth
              {...register('password')}
            />
            {errorMessage?.password && (
              <Alert sx={{ mt: 2 }} severity="error">
                {errorMessage?.password[0]}
              </Alert>
            )}
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Already have an account?{' '}
                  {/* <Link
                    component={'a'}
                    color={'primary'}
                    href={'/signin-simple'}
                    underline={'none'}
                  >
                    Login.
                  </Link> */}
                  <Link
                    to="/signin-simple"
                    style={{ textDecoration: 'none', color: '#2196f3' }}
                  >
                    Login.
                  </Link>
                </Typography>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Sign up
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={12}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              variant={'subtitle2'}
              color={'text.secondary'}
              align={'center'}
            >
              By clicking "Sign up" button you agree with our{' '}
              {/* <Link
                component={'a'}
                color={'primary'}
                href={'/company-terms'}
                underline={'none'}
              >
                company terms and conditions.
              </Link> */}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
