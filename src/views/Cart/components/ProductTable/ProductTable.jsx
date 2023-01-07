import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';
import { api } from './../../../../api/config';

const ProductTable = () => {
  const [cartData, setcartData] = useState([]);
  const [previousPrice, setPreviousPrice] = useState(0);
  let totalPriceOfAllProduct = [];
  useEffect(() => {
    fetch(`${api}/get-cart-items?customer_id=3`)
      .then((res) => res.json())
      .then((data) => {
        setcartData(data.data);
        //         console.log(data.data);
      });
  }, []);

  const calculateTotal = (price, quantity) => {
    const p = price.split('৳')[1];
    const total = parseInt(p) * parseFloat(quantity);
    totalPriceOfAllProduct.push(total);
    return total;
  };

  const subTotal = () => {
    // p?.product?.price, p?.quantity
    //     let subTotal = 0;
    //     totalPriceOfAllProduct.map((p) => {
    //       subTotal = p + subTotal;
    //     });
    console.log(totalPriceOfAllProduct);
    //     setPreviousPrice(subTotal);
  };

  subTotal();

  return (
    <>
      {/* cart products */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="center">
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartData?.map((p) => (
              <TableRow
                key={p?.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={{ alignItems: 'center', display: 'flex', gap: '3rem' }}
                  >
                    <CancelOutlinedIcon />
                    <Box sx={{ width: '100px', height: '100px' }}>
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={p?.product?.feature_photo}
                        alt=""
                      />
                    </Box>
                    {p?.product?.product_name}
                  </Box>
                </TableCell>
                <TableCell align="right">{p?.product?.price}</TableCell>
                <TableCell>
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
                      defaultValue={p?.quantity}
                      style={{ width: '50px' }}
                      type="number"
                    />
                    <RemoveIcon />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ৳ {calculateTotal(p?.product?.price, p?.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* total price */}
      <Box
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          mt: 8,
        }}
      >
        <Paper elevation={3} sx={{ minWidth: 400, padding: 2 }}>
          <h3 align="center" sx={{ textAlign: 'center' }}>
            Cart Total
          </h3>
          <Box
            sx={{
              display: 'flex',
              borderTop: '1px solid gray',
              justifyContent: 'space-between',
            }}
          >
            <h4>SubTotal</h4>

            <h4>৳ {previousPrice}</h4>
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderTop: '1px solid gray',
              justifyContent: 'space-between',
            }}
          >
            <h4>Total</h4>
            <h4>৳ {previousPrice}</h4>
          </Box>

          <Button variant="contained" sx={{ width: '100%' }}>
            Proced To Checkout
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default ProductTable;
