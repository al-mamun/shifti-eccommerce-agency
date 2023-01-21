/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable quotes */
import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import Main from 'layouts/Main';
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import { useContext } from 'react';
import { CartData } from 'context/CartContext';
import { countries } from './../../../data/countrys';
import Autocomplete from '@mui/material/Autocomplete';
import { api } from 'api/config';
import { ToastContainer, toast } from 'react-toastify';

const General = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const [authUser, setAuthUser] = useState(null);
  const { userData, cartItemCount } = useContext(CartData);
  const navigate = useNavigate();
  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    return authUser;
  }, []);

  useEffect(() => {
    setAuthUser(authData());
    cartItemCount();
  }, [authData]);
  
  const [traddress, setAddress] = useState([]);
  const [city, setCity] = useState([]);
  const [zipCode, setZipCode] = useState([]);
  const [trcountry, setCountry] = useState([]);
  const [phone_number, setphoneNumber] = useState([]);
  

 useEffect(() => {
    const authUser = ReactSession.get('userData');
    console.log(authUser);
    setTimeout(() => {
      fetch(`${api}/api/customer-data-address`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${authUser?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data?.address);
          setAddress(data?.address);
          setCity(data?.city);
          setZipCode(data?.post_code);
          setCountry(data?.country);
          setphoneNumber(data?.phone);
          
        });
      }, 1000)
    }, [authData]);

  const onSubmit = (dataList) => {
   
    // setCardData(data);
    fetch(`${api}/api/customer-data-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData?.token} `,
      },
      body: JSON.stringify(dataList),
    })
    .then((res) => res.json())
    .then((data) => {
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
    <Main>
      <Page>
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
        <Box>
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Change your private informationss
          </Typography>
          <Typography variant={'subtitle2'} color={'text.secondary'}>
            Please read our{' '}
            <Link color={'primary'} href={'/company-terms'} underline={'none'}>
              terms of use
            </Link>{' '}
            to be informed how we manage your private data.
          </Typography>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  First Name
                </Typography>
                <TextField
                  variant="outlined"
                  name={'first_name'}
                  label={authUser?.user?.first_name}
                  // defaultValue={authUser?.user?.first_name}
                  fullWidth
                  {...register('first_name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Last Name
                </Typography>
                <TextField
                  label={
                    authUser?.user
                      ? authUser?.user?.last_name
                      : userData?.user?.last_name
                  }
                  variant="outlined"
                  name={'last_name'}
                 
                  fullWidth
                  defaultValue={authUser?.user?.last_name}
                  {...register('last_name')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Your email
                </Typography>
                <TextField
                  label={authUser?.user?.email}
                  variant="outlined"
                  name={'email'}
                  fullWidth
                  defaultValue={authUser?.user?.email}
                  {...register('email')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                  
                >
                  Phone
                </Typography>
                <TextField
                  variant="outlined"
                  label={phone_number}
                  name={'phone'}
                  fullWidth
                  defaultValue={authUser?.user?.phone_number}
                  {...register('phone')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Zip Code
                </Typography>
                <TextField
                  label={zipCode}
                  variant="outlined"
                  name={'zip_code'}
                  fullWidth
                  {...register('zip_code')}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Country
                </Typography>
                <Autocomplete
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={trcountry}
                      name={'country'}
                      value={trcountry}
                      {...register('country')}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  City
                </Typography>
                <TextField
               
               label={city}
                  variant="outlined"
                  name={'city'}
                  fullWidth
                  defaultValue={city}
                  {...register('city')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Enter your address
                </Typography>
                <TextField
                  label={traddress}
                  variant="outlined"
                  name={'address'}
                  {...register('address')}
                  fullWidth
                />
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  margin={'0 auto'}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant={'subtitle2'}>
                      You may also consider to update your{' '}
                      <Link
                        color={'primary'}
                        href={'/account-billing'}
                        underline={'none'}
                      >
                        billing information.
                      </Link>
                    </Typography>
                  </Box>
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Page>
    </Main>
  );
};

export default General;
