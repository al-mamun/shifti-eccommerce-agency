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

import Page from '../components/Page';
import Main from 'layouts/Main';
import { useForm } from 'react-hook-form';
import { ReactSession } from 'react-client-session';
import { CartData } from 'App';
import { useContext } from 'react';

const General = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const [authUser, setAuthUser] = useState(null);
  const { userData } = useContext(CartData);

  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    return authUser;
  }, []);

  useEffect(() => {
    setAuthUser(authData());
  }, [authData]);

  const onSubmit = (values) => {
    return values;
  };

  return (
    <Main>
      <Page>
        <Box>
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Change your private information
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
                  label={
                    authUser?.user
                      ? authUser?.user?.first_name
                      : userData?.user?.first_name
                  }
                  variant="outlined"
                  name={'first_name'}
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
                  label={
                    authUser?.user
                      ? authUser?.user?.email
                      : userData?.user?.email
                  }
                  variant="outlined"
                  name={'email'}
                  fullWidth
                  defaultValue={authUser?.user?.email}
                  {...register('email')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Phone
                </Typography>
                <TextField
                  label={
                    authUser?.user
                      ? authUser?.user?.phone
                      : userData?.user?.phone
                  }
                  variant="outlined"
                  name={'phone'}
                  fullWidth
                  defaultValue={authUser?.user?.phone}
                  {...register('phone')}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Country
                </Typography>
                <TextField
                  label={
                    authUser?.user
                      ? authUser?.user?.country
                      : userData?.user?.country
                  }
                  variant="outlined"
                  name={'country'}
                  fullWidth
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
                  label={
                    authUser?.user ? authUser?.user?.city : userData?.user?.city
                  }
                  variant="outlined"
                  name={'city'}
                  fullWidth
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
                  label={
                    authUser?.user
                      ? authUser?.user?.address
                      : userData?.user?.address
                  }
                  variant="outlined"
                  name={'address'}
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
