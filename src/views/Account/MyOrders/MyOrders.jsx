/* eslint-disable semi */
import React, { useContext, useEffect } from 'react';
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

import Page from '../components/Page';
import Main from 'layouts/Main';
import { CartData } from 'context/CartContext';

const MyOrders = () => {
  const { getMyOrders, myOrdersData } = useContext(CartData);
  //   const theme = useTheme();
  useEffect(() => {
    getMyOrders();
  }, []);

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
        </Box>
      </Page>
    </Main>
  );
};

export default MyOrders;
