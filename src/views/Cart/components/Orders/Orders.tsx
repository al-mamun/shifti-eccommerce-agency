/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState,useCallback } from 'react';
import { api } from './../../../../api/config';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartData } from 'App';
const Orders = (): JSX.Element => {
  const theme = useTheme();
 const {cartData,orderSummary,isLoading,removeFormCart} = useContext(CartData);


  const calculateTotal = (price: string, quantity: string) => {
    const p = price.split('৳')[1];
    const total = parseInt(p) * parseFloat(quantity);
    return total;
  };

  return (
    <Box>
        <ToastContainer
        position="top-right"
        autoClose={5000}
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
      {cartData?.map((item, i) => (
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
                maxWidth: { xs: 120, sm: 200 },
                marginRight: 2,
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
              }}
            />
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              justifyContent={'space-between'}
              alignItems={'flex-start'}
              width={1}
            >
              <Box sx={{ order: 1 }}>
                <Typography fontWeight={700} gutterBottom>
                  {item?.product?.product_name?.slice(0,20)} ...
                </Typography>
                <Typography
                  color={'text.secondary'}
                  variant={'subtitle2'}
                  gutterBottom
                >
                  {/* Size:{' '} */}
                  {/* <Typography
                    variant={'inherit'}
                    component={'span'}
                    color={'inherit'}
                    fontWeight={700}
                  >
                    {item.size}
                  </Typography> */}
                </Typography>
                {/* <Typography
                  color={'text.secondary'}
                  variant={'subtitle2'}
                  gutterBottom
                >
                  Gender:{' '}
                  <Typography
                    variant={'inherit'}
                    component={'span'}
                    color={'inherit'}
                    fontWeight={700}
                  >
                    {item.gender}
                  </Typography>
                </Typography> */}
                {/* <Typography
                  color={'text.secondary'}
                  variant={'subtitle2'}
                  noWrap={true}
                  gutterBottom
                >
                  Code:{' '}
                  <Typography
                    variant={'inherit'}
                    component={'span'}
                    color={'inherit'}
                    fontWeight={700}
                  >
                    {item.code}
                  </Typography>
                </Typography> */}
              </Box>
              <Stack
                spacing={1}
                direction={{ xs: 'row', sm: 'column' }}
                marginTop={{ xs: 2, sm: 0 }}
                sx={{ order: { xs: 3, sm: 2 } }}
              >
                <Box
                  onClick={()=>removeFormCart(item?.product?.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                    cursor:'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    marginRight={0.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </Box>
                  Remove
                </Box>
                <Link
                  href={'#'}
                  underline={'none'}
                  variant={'subtitle2'}
                  noWrap={true}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    marginRight={0.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </Box>
                  Save
                </Link>
              </Stack>
              <Stack
                spacing={1}
                direction={'row'}
                alignItems={'center'}
                marginTop={{ xs: 2, sm: 0 }}
                sx={{ order: { xs: 2, sm: 3 } }}
              >
                <FormControl fullWidth>
                <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: '2rem',
                      justifyContent: 'center',
                    }}
                  >
                    <AddIcon />
                    <input
                      defaultValue={item?.quantity}
                      style={{ width: '50px' }}
                      type="number"
                    />
                    <RemoveIcon />
                  </Box>
                </FormControl>
                <Box fontWeight={700} marginLeft={2} >
                <h4 style={{display:'flex'}}><span>৳</span>{calculateTotal(item?.product?.price, item?.quantity)}</h4>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Divider
            sx={{
              marginY: { xs: 2, sm: 4 },
             
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Orders;
