/* eslint-disable @typescript-eslint/no-empty-function */
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
import { useEffect, useState, useCallback } from 'react';
import { api } from './../../../../api/config';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartData } from 'context/CartContext';

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Orders = (): JSX.Element => {
  const theme = useTheme();
  const { cartData, updateCartItem, isLoading, removeFormCart, getCartItems } =
    useContext(CartData);

  const calculateTotal = (price: string, quantity: string) => {
    const p = price.split('৳')[1];
    const total = parseInt(p) * parseFloat(quantity);
    return total;
  };

  useEffect(() => {
    getCartItems;
  }, []);

  const handleCartUpdate = (id, qty, action) => {
    console.log(id, qty, action);
    const quntity = Number(qty) + 1;
    updateCartItem(id, quntity.toString(), action);
  };

  return (
    <Box>
      <Box
        sx={{
          display: { md: 'flex', xs: 'none' },
          justifyContent: 'space-between',
          backgroundColor: '#6777885c',
          p: 2,
          mb: 2,
          borderRadius: 1,
        }}
      >
        <Box
          display={'flex'}
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
          width={1}
        >
          <Box sx={{ order: 1 }}>
            <Typography fontWeight={700} gutterBottom>
              Product Details
            </Typography>
          </Box>
          <Box sx={{ order: 1 }}>
            <Typography fontWeight={700} gutterBottom>
              Action
            </Typography>
          </Box>

          <Box
            sx={{
              order: 1,
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <Typography fontWeight={700} gutterBottom>
              Quantity
            </Typography>
            <Typography fontWeight={700} gutterBottom>
              Price
            </Typography>
          </Box>
        </Box>
      </Box>
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
                  {item?.product?.product_name?.slice(0, 20)} ...
                </Typography>
                <Typography
                  color={'text.secondary'}
                  variant={'subtitle2'}
                  gutterBottom
                >
                  {/* Size:{' '} */}
                  <Typography
                    variant={'inherit'}
                    component={'span'}
                    color={'inherit'}
                    fontWeight={700}
                  >
                    Price :{item?.product?.price}
                  </Typography>
                </Typography>

                <Typography
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
                    {item?.product?.id}
                  </Typography>
                </Typography>
              </Box>
              <Stack
                spacing={1}
                direction={{ xs: 'row', sm: 'column' }}
                marginTop={{ xs: 2, sm: 0 }}
                sx={{ order: { xs: 3, sm: 2 } }}
              >
                <Box
                  onClick={() => removeFormCart(item?.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                    cursor: 'pointer',
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

                      justifyContent: 'center',
                    }}
                  >
                    <IconButton
                      aria-label="cart"
                      onClick={() =>
                        handleCartUpdate(item?.id, item?.quantity, 1)
                      }
                    >
                      <StyledBadge color="secondary">
                        <AddIcon />
                      </StyledBadge>
                    </IconButton>
                    <input
                      value={item?.quantity}
                      style={{ width: '50px' }}
                      type="number"
                    />
                    <IconButton
                      aria-label="cart"
                      onClick={() =>
                        handleCartUpdate(item?.id, item?.quantity, 0)
                      }
                    >
                      <StyledBadge color="secondary">
                        <RemoveIcon />
                      </StyledBadge>
                    </IconButton>
                  </Box>
                </FormControl>
                <Box fontWeight={700} marginLeft={2}>
                  <h4 style={{ display: 'flex' }}>
                    <span>$</span>
                    {calculateTotal(item?.product?.price, item?.quantity)}
                  </h4>
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
