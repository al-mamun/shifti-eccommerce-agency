import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ReactSession } from 'react-client-session';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import { CartData } from 'context/CartContext';
import Page from '../components/Page';
import Main from 'layouts/Main';
import { useForm } from 'react-hook-form';
import { api } from 'api/config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const validationSchema = yup.object({
  currentPassword: yup.string().required('Please specify your password'),
  newPassword: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
  repeatPassword: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
});




const Security = (): JSX.Element => {

  const { userData, cartItemCount } = useContext(CartData);
  const navigate = useNavigate();

  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
  const authUser = ReactSession.get('userData');
  return authUser;
  }, []);
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  };

  useEffect(() => {
    const authUser = ReactSession.get('userData');
        fetch(`${api}/api/customer-data-billing-information`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${authUser?.token}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data?.address);
        
        });
  
  }, [authData]);

  const onSubmit = (values) => {

    fetch(`${api}/api/customer-password-data-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData?.token} `,
      },
      body: JSON.stringify(values),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.status == 201) {
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
      } else {
        toast.error(data?.msg, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Main>
      <Page>
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
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography variant="h6" fontWeight={700}>
              Change your password
            </Typography>
            {/* <Button
              size={'large'}
              variant={'outlined'}
              sx={{ marginTop: { xs: 2, md: 0 } }}
            >
              Log out
            </Button> */}
          </Box>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Current password
                </Typography>
                <TextField
                  variant="outlined"
                  name={'currentPassword'}
                  type={'password'}
                  fullWidth
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.currentPassword &&
                    Boolean(formik.errors.currentPassword)
                  }
                  // @ts-ignore
                  helperText={
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  New password
                </Typography>
                <TextField
                  variant="outlined"
                  name={'newPassword'}
                  type={'password'}
                  fullWidth
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  // @ts-ignore
                  helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Repeat password
                </Typography>
                <TextField
                  variant="outlined"
                  name={'repeatPassword'}
                  type={'password'}
                  fullWidth
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.repeatPassword &&
                    Boolean(formik.errors.repeatPassword)
                  }
                  // @ts-ignore
                  helperText={
                    formik.touched.repeatPassword &&
                    formik.errors.repeatPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch color="primary" defaultChecked />}
                  label={
                    <Typography variant="subtitle1" fontWeight={700}>
                      Public Profile
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label={
                    <Typography variant="subtitle1" fontWeight={700}>
                      Expose your email
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid> */}
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
                        href={'/account-notifications'}
                        underline={'none'}
                      >
                        notification settings.
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

export default Security;
