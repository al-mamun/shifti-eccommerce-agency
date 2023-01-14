/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
/* eslint-disable indent */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useContext } from 'react';
import { CartData } from 'context/CartContext';

const Orders = (): JSX.Element => {
  const theme = useTheme();
  const { cartData, orderSummary, CardData } = useContext(CartData);

  const calculateTotal = (price, quantity) => {
    const p = price.split('৳')[1];
    const total = parseInt(p) * parseFloat(quantity);

    return total;
  };

  return (
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
              <Box>
                <Typography fontWeight={700} variant={'subtitle2'}>
                  {item?.product?.product_name?.slice(0, 20)} ...
                </Typography>
                {/* <Typography color={'text.secondary'} variant={'subtitle2'}>
                  Size: {item.size}
                </Typography> */}
                {/* <Typography
                  color={'text.secondary'}
                  variant={'subtitle2'}
                  noWrap={true}
                >
                  Code: {item.code}
                </Typography> */}
              </Box>
              <Box>
                {/* <Typography fontWeight={700} variant={'subtitle2'}>
                  {item.price}
                </Typography> */}

                <Box fontWeight={700} marginLeft={2}>
                  <h4 style={{ display: 'flex' }}>
                    <span>$</span>
                    {calculateTotal(item?.product?.price, item?.quantity)}
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
          <Typography color={'text.secondary'}>Subtotal</Typography>
          <Typography color={'text.secondary'} fontWeight={700}>
            $ {orderSummary?.subTotal}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'}>Quantity</Typography>
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
  );
};

export default Orders;
