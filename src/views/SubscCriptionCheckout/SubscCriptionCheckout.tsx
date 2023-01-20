/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { api } from 'api/config';
import Main from '../../layouts/Main';
import Container from 'components/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useContext } from 'react';
import { CartData } from 'context/CartContext';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import { countries } from '../../data/countrys';
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

const Checkout = (): JSX.Element => {
  const theme = useTheme();
  const { cartData, orderSummary, CardData, setCardData, userData } =
    useContext(CartData);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(null);

  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    return authUser;
  }, []);

  useEffect(() => {
    setAuthUser(authData());
    console.log(authUser);
  }, [authData]);

  const calculateTotal = (price, quantity) => {
    const p = price.split('৳')[1];
    const total = parseInt(p) * parseFloat(quantity);

    return total;
  };

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Main>
        <Container>
          <Box>
            <Grid container spacing={{ xs: 4, md: 8 }}>
              <Grid item xs={12} md={7}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Box>
                      <Grid container spacing={{ xs: 2, md: 4 }}>
                        <Grid item xs={12}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Enter your full name
                          </Typography>
                          <TextField
                            label="Full name *"
                            variant="outlined"
                            name={'fullName'}
                            {...register('fullName', { required: true })}
                            fullWidth
                          />
                          {errors.fullName &&
                            errors.fullName.type === 'required' && (
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This is required
                              </Alert>
                            )}
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
                            // @ts-ignore
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
                                label="Choose a country"
                                name={'country'}
                                {...register('country', { required: true })}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                          {errors.country &&
                            errors.country.type === 'required' && (
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This is required
                              </Alert>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Zip Code
                          </Typography>
                          <TextField
                            label="Zip Code *"
                            variant="outlined"
                            name={'zip_code'}
                            {...register('zip_code', { required: true })}
                            fullWidth
                          />
                          {errors.zip_code &&
                            errors.zip_code.type === 'required' && (
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This is required
                              </Alert>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            City
                          </Typography>
                          <TextField
                            label="City *"
                            variant="outlined"
                            name={'city'}
                            {...register('city', { required: true })}
                            fullWidth
                          />
                          {errors.city && errors.city.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Phone Number
                          </Typography>
                          <TextField
                            label="Phone *"
                            variant="outlined"
                            name={'phone'}
                            {...register('phone', { required: true })}
                            fullWidth
                          />
                          {errors.phone && errors.phone.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
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
                            label="Address *"
                            variant="outlined"
                            name={'address'}
                            {...register('address', { required: true })}
                            fullWidth
                          />
                          {errors.address &&
                            errors.address.type === 'required' && (
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This is required
                              </Alert>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Enter your email
                          </Typography>
                          <TextField
                            label="Email *"
                            variant="outlined"
                            name={'email'}
                            {...register('email', { required: true })}
                            fullWidth
                          />
                          {errors.email && errors.email.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item xs={12}>
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked={true}
                                  color="primary"
                                />
                              }
                              label="Billing address is the same as shipping address"
                            />
                          </Box>
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked={true}
                                  color="primary"
                                />
                              }
                              label="Save this information for the next time"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={700} marginBottom={4}>
                      Payment information
                    </Typography>
                    <Billing />
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="h6" fontWeight={700} marginBottom={4}>
                  Order summary
                </Typography>
                <Card
                  variant={'outlined'}
                  sx={{
                    padding: { xs: 2, sm: 4 },
                  }}
                >
                  {/* <Orders /> */}

                  <Box>
                    {cartData.map((item, i) => (
                      <Box key={i}>
                        <Box display={'flex'}>
                          <Box
                            component={'img'}
                            src={item?.product?.feature_photo}
                            alt={item?.product?.product_name}
                            sx={{
                              borderRadius: 2,
                              width: 100,
                              height: 100,
                              maxWidth: 120,
                              marginRight: 2,
                              filter:
                                theme.palette.mode === 'dark'
                                  ? 'brightness(0.7)'
                                  : 'none',
                            }}
                          />
                          <Box
                            display={'flex'}
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            justifyContent={'space-between'}
                            alignItems={'flex-start'}
                            width={1}
                          >
                            <Box>
                              <Typography
                                fontWeight={700}
                                variant={'subtitle2'}
                              >
                                {item?.product?.product_name?.slice(0, 20)} ...
                              </Typography>
                              <Typography
                                color={'text.secondary'}
                                variant={'subtitle2'}
                              >
                                Price :${item?.product?.price}
                              </Typography>
                              <Typography
                                color={'text.secondary'}
                                variant={'subtitle2'}
                                noWrap={true}
                              >
                                Code: {item?.product?.id}
                              </Typography>
                            </Box>
                            <Box>
                              {/* <Typography fontWeight={700} variant={'subtitle2'}>
                  {item.price}
                </Typography> */}

                              <Box fontWeight={700} marginLeft={2}>
                                <h4 style={{ display: 'flex' }}>
                                  <span>$</span>
                                  {calculateTotal(
                                    item?.product?.price,
                                    item?.quantity,
                                  )}
                                </h4>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Divider
                          sx={{
                            marginY: { xs: 2, sm: 4 },
                            // display: i === mock.length - 1 ? 'none' : 'block',
                          }}
                        />
                      </Box>
                    ))}
                    <Box
                      component={'form'}
                      noValidate
                      autoComplete="off"
                      sx={{
                        marginY: 4,
                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                          bgcolor: 'background.paper',
                        },
                      }}
                    >
                      <Box display="flex">
                        <Box
                          flex={'1 1 auto'}
                          component={TextField}
                          label="Discount code"
                          variant="outlined"
                          color="primary"
                          fullWidth
                          height={54}
                          maxWidth={300}
                        />
                        <Box
                          component={Button}
                          variant="contained"
                          color="primary"
                          size="large"
                          height={54}
                          marginLeft={1}
                          width={1}
                          flex={1}
                        >
                          Apply
                        </Box>
                      </Box>
                    </Box>
                    <Stack spacing={2} marginY={{ xs: 2, sm: 4 }}>
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography color={'text.secondary'}>
                          Subtotal
                        </Typography>
                        <Typography color={'text.secondary'} fontWeight={700}>
                          $ {orderSummary?.subTotal}
                        </Typography>
                      </Box>
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography color={'text.secondary'}>
                          Quantity
                        </Typography>
                        <Typography color={'text.secondary'} fontWeight={700}>
                          {orderSummary?.quantity}
                        </Typography>
                      </Box>
                      {/* <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'}>VAT (+20%)</Typography>
          <Typography color={'text.secondary'} fontWeight={700}>
            $35,94
          </Typography>
        </Box> */}
                      <Divider />
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant={'h6'} fontWeight={700}>
                          Order total
                        </Typography>
                        <Typography variant={'h6'} fontWeight={700}>
                          $ {orderSummary?.totalAmount}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* start Billing */}

                  <Box>
                    <Typography variant="h6" fontWeight={700} marginBottom={4}>
                      Payment information
                    </Typography>
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
                          {...register('cardNumber', { required: true })}
                          fullWidth
                          required
                        />
                        {errors.cardNumber &&
                          errors.cardNumber.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
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
                          name={'cardName'}
                          {...register('cardName', { required: true })}
                          fullWidth
                        />
                        {errors.cardName &&
                          errors.cardName.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
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
                          {...register('month', { required: true })}
                          fullWidth
                          required
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
                          {...register('year', { required: true })}
                          fullWidth
                          required
                        />
                        {errors.year && errors.year.type === 'required' && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            This is required
                          </Alert>
                        )}
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
                          {...register('cvv', { required: true })}
                          fullWidth
                          required
                        />
                        {errors.cvv && errors.cvv.type === 'required' && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            This is required
                          </Alert>
                        )}
                      </Grid>
                    </Grid>

                    <Button
                      sx={{ mt: 3 }}
                      type={'submit'}
                      variant={'contained'}
                      size={'large'}
                      fullWidth
                    >
                      Place an order
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      marginRight: { xs: -2, sm: -4 },
                      marginLeft: { xs: -2, sm: -4 },
                      marginBottom: { xs: -2, sm: -4 },
                      padding: { xs: 2, sm: 4 },
                      bgcolor: 'alternate.main',
                    }}
                  >
                    <Stack direction={'row'} spacing={2}>
                      <Button
                        sx={{
                          color: 'text.secondary',
                        }}
                        startIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        }
                      >
                        Contact sales
                      </Button>
                      <Button
                        sx={{
                          color: 'text.secondary',
                        }}
                        startIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        }
                      >
                        Email us
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Main>
    </form>
  );
};

export default Checkout;
