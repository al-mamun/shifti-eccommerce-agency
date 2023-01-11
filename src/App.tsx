/* eslint-disable semi */
/* eslint-disable quotes */
import { BrowserRouter } from 'react-router-dom';
import Page from './components/Page';
import Routes from './Routes';

import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { createContext } from "react";
import { api } from './api/config';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { useEffect } from 'react';

export const routerBasename = '/shifti';
export const CartData = createContext(null);

const App = (): JSX.Element => {
  const [cartData, setcartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSummary, setorderSummary] = useState({})
  const [userData, setuserData] = useState(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFormCart = (id:any) =>{
    console.log(id);
    fetch(`${api}/shifti_api/public/remove-product-from-cart?cart_id=${id}`,{
      method:'POST',
     headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body:JSON.stringify({cart_id:id})
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        toast('Product Remove Successfully!!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        getCartItems();
        console.log(data);
      });
  }

  const getCartItems = useCallback(() => {
    fetch(`${api}/get-cart-items?customer_id=3`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setcartData(data.data);
        //         console.log(data.data);
      });
  }, []);

  const getCarSummary = useCallback(() => {
    fetch(`${api}/get-cart-summary`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setorderSummary(data)
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCartItems();
    getCarSummary()
  }, []);



  return (
    <Page>
      {/* router base for server subdirectory */}
      <CartData.Provider value={{
    cartData,
    orderSummary,
    isLoading,
    removeFormCart,
    userData,
    setuserData
  }}>
      <BrowserRouter basename={routerBasename}>
        <Routes />
      </BrowserRouter>
      </CartData.Provider>
    </Page>
  );
};

export default App;
