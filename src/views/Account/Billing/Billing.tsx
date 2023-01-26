import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import valid from 'card-validator';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ReactSession } from 'react-client-session';
import { useContext } from 'react';
import { CartData } from 'context/CartContext';
import Page from '../components/Page';
import Main from 'layouts/Main';
import { useForm } from 'react-hook-form';
import { api } from 'api/config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const validationSchema = yup.object({
  cardNumber: yup
    .string()
    .test(
      'test-number',
      'Credit card number is invalid',
      (value) => valid.number(value).isValid,
    ),
  name: yup.string().trim().required('Please specify your name on the card'),
  date: yup
    .string()
    .typeError('Not a valid expiration date. Example: MM/YY')
    .max(5, 'Not a valid expiration date. Example: MM/YY')
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY',
    )
    .required('Expiration date is required'),
  zip: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid zip')
    .max(8, 'Please enter a valid zip')
    .required('Please specify the billing zip code'),
  cvv: yup
    .string()
    .trim()
    .matches(/^\d+$/, 'Not a valid CVV. Should contain only numbers')
    .min(3, 'Please enter a valid cvv')
    .max(3, 'Please enter a valid cvv')
    .required('Please specify your card cvv'),
});

const Billing = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const [authUser, setAuthUser] = useState(null);
  const { userData, cartItemCount } = useContext(CartData);
  const navigate = useNavigate();
  ReactSession.setStoreType('sessionStorage');

  const [cardNumber, setCardNumber] = useState(null);
  const [date, setExpDate] = useState(null);
  const [name, setName] = useState(null);
  const [zip_code, setZipCode] = useState(null);
  const [cvv, setCVV] = useState(null);

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    return authUser;
  }, []);

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
          console.log(data?.address);
          setCardNumber(data?.card_number);
          setExpDate(data?.expiration_date);
          setName(data?.name);
          setZipCode(data?.zip_code);
          setCVV(data?.cvv);
        });
  
  }, [authData]);

  const initialValues = {
    cardNumber: '',
    name: '',
    date: '',
    zip: '',
    cvv: '',
  };

  const onSubmit = (values) => {
       // setCardData(data);
    fetch(`${api}/api/customer-billing-data-update`, {
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

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

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
            Change your card data
          </Typography>
          <Typography
            variant={'subtitle2'}
            color={'text.secondary'}
            gutterBottom
          >
            Please be informed that we do not share any sensitive information
            such as your bank card data with any third party agencies and
            companies.
          </Typography>
          <Typography variant={'subtitle2'} color={'text.secondary'}>
            Please read our{' '}
            <Link color={'primary'} href={'/company-terms'} underline={'none'}>
              terms of use
            </Link>{' '}
            to be informed how we manage your bank data.
          </Typography>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography
                    variant={'subtitle2'}
                    sx={{ marginBottom: 2 }}
                    fontWeight={700}
                  >
                    Enter your card number
                  </Typography>
             
                  <TextField
                    label={cardNumber}
                    variant="outlined"
                    name={'cardNumber'}
                    fullWidth
                    value={formik.values.cardNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.cardNumber &&
                      Boolean(formik.errors.cardNumber)
                    }
                    // @ts-ignore
                    helperText={
                      formik.touched.cardNumber && formik.errors.cardNumber
                    }
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
                    label={name}
                    variant="outlined"
                    name={'name'}
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    // @ts-ignore
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant={'subtitle2'}
                    sx={{ marginBottom: 2 }}
                    fontWeight={700}
                  >
                    Expiration date
                  </Typography>
                  <TextField
                    label={date}
                    variant="outlined"
                    name={'date'}
                    fullWidth
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    // @ts-ignore
                    helperText={formik.touched.date && formik.errors.date}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography
                    variant={'subtitle2'}
                    sx={{ marginBottom: 2 }}
                    fontWeight={700}
                  >
                    Billing zip code
                  </Typography>
                  <TextField
                    label={zip_code}
                    variant="outlined"
                    name={'zip'}
                    fullWidth
                    value={formik.values.zip_code}
                    onChange={formik.handleChange}
                    error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
                    // @ts-ignore
                    helperText={formik.touched.zip_code && formik.errors.zip_code}
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
                    label={cvv}
                    variant="outlined"
                    name={'cvv'}
                    fullWidth
                    value={formik.values.cvv}
                    onChange={formik.handleChange}
                    error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                    // @ts-ignore
                    helperText={formik.touched.cvv && formik.errors.cvv}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
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
                          href={'/account'}
                          underline={'none'}
                        >
                          private information.
                        </Link>
                      </Typography>
                    </Box>
                    <Button
                      size={'large'}
                      variant={'contained'}
                      type={'submit'}
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Page>
    </Main>
  );
};

export default Billing;
