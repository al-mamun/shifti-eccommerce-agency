/* eslint-disable semi */
import React, { useState, useEffect, useContext,useCallback } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Page from '../components/Page';
import Main from 'layouts/Main';
import { CartData } from 'context/CartContext';
import { api } from 'api/config';
import { ReactSession } from 'react-client-session';

const MyOrders = () => {
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [total_amount, setTotalAmount] = useState(null);
  const navigate = useNavigate();
  const { getMyOrders, myOrdersData } = useContext(CartData);
  const [authUser, setAuthUser] = useState(null);
  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    return authUser;
  }, []);

  //   const theme = useTheme();
  function addToCart(subscriber_id, product_id) {

    const list = {
      customer_id: `${authUser?.user?.id}`,
      subscriber_id: subscriber_id,
      product_id: product_id,
    };
    const token = `${authUser?.token}`;

    const authData = useCallback(() => {
      const authUser = ReactSession.get('userData');
      return authUser;
    }, []);

    fetch(`${api}/api/subcraption-reqeust`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == 'Unauthenticated.') {
          setErrorMessage('test');
          toast.error(data.msg, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setTimeout(() => {
            navigate('/signin-simple');
          }, 5000);
          return;
        }
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
        setTimeout(() => {
          navigate('/subcription-check-out');
        }, 2000);
      });
  }  
  useEffect(() => {
      getMyOrders();
      const authUser = ReactSession.get('userData');
      fetch(`${api}/api/get-total-amount`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${authUser?.token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        setTotalAmount(data);
      });
    }, [authData]);

  return (
    <Main>
      <Page>
      <Box>
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography variant="h6" fontWeight={700}>
              Subscriptions And Add-ons
            </Typography>
          
            <Typography variant="h6" fontWeight={700}>
            Your Total Subscription Cost &nbsp;&nbsp;&nbsp;   ${total_amount}
            </Typography>
          </Box>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography variant="h6"  className={'your-add-ones'}>
              Your Subscription
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            className="box_package"
          >
            
              <Box
                className="left_package"
              >
                <Box
                  className={'top_pro_sum'}
                >
                  <svg width="150" height="36" viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H150L141.176 18L150 36H0V0Z" fill="#487EFC"/>
                  </svg>
                  <span className={'pro-text'}>Pro</span>
                </Box>
                <Typography variant="h6"  className={'my_order_total_user'}>
                    200 Users
                </Typography>
                <Typography variant="h6"  className={'my_order_per_user'}>
                  $5.50 <span className={'dolor_per_user'}> per user / month </span>
                </Typography>
                
                <Typography variant="h6"  className={'my_order_total_amount'}>
                    Total $1100.00
                </Typography>
            </Box>
            <Box
                className="right_package"
              >
              <Button 
                size={'large'} 
                variant={'contained'}
                onClick={() => addToCart(100,1101)}
                className="my_order_subcraption"
                style={{
                  width: 'rgba(55, 125, 255, 0.1) !important'
                }}
                
              >
                  Manage Subscription & Add Ons
              </Button>
            </Box>
          </Box>
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography variant="h6"  className={'your-add-ones'}>
              Your Add-Ons
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className={'order_table_head'}>
                <TableRow className={'order_table_row'}>
                  <TableCell sx={{ fontWeight: '700' }}>Order Number</TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>
                    Subscription / Add-On
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>
                    Start Date
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>
                    Users
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>
                    Monthly Subscription
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>

                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={'order_table_body'}>
                {myOrdersData?.map((data) => (
                  <TableRow
                    key={data?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={'order_table_body_row'}
                  >
                    <TableCell component="th" scope="row">
                      {data?.order_number}
                    </TableCell>
                    <TableCell align="left">$30</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">1</TableCell>
                    <TableCell align="left">
                      ${data?.total_amount}
                      
                    </TableCell>
                    <TableCell align="left">
                      ...
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* <Box>
          <Box
            display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent={'space-between'}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Typography variant="h6" fontWeight={700}>
              My Orders - List
            </Typography>
          </Box>
          <Box paddingY={4}>
            <Divider />
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: '700' }}>Order Number</TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>
                    Address
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>
                    Phone
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>
                    Total Amount
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: '700' }}>
                    Shipping Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myOrdersData?.map((data) => (
                  <TableRow
                    key={data?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {data?.order_number}
                    </TableCell>
                    <TableCell align="left">{data?.address?.address}</TableCell>
                    <TableCell align="left">{data?.address?.phone}</TableCell>
                    <TableCell align="left">${data?.total_amount}</TableCell>
                    <TableCell align="left">
                      <Button variant="outlined">
                        {data?.shipping_status
                          ? data?.shipping_status
                          : 'Pending'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box> */}
      </Page>
    </Main>
  );
};

export default MyOrders;
