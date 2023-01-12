/* eslint-disable semi */
/* eslint-disable quotes */
import { BrowserRouter } from 'react-router-dom';
import Page from './components/Page';
import Routes from './Routes';

import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { createContext } from 'react';
import { api } from './api/config';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import { useCallback } from 'react';

export const routerBasename = '/shifti';
export const CartData = createContext(null);

const App = (): JSX.Element => {
  const [cartData, setcartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSummary, setorderSummary] = useState({});
  const [userData, setuserData] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    setAuthUser(authUser);
    return authUser;
  }, []);

  useEffect(() => {
    authData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFormCart = (id: any) => {
    const token = `${authUser?.user ? authUser?.token : userData?.token}`;
    console.log(authUser);

    fetch(
      `${api}/api/shifti_api/public/remove-product-from-cart?cart_id=${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart_id: id }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        toast('Product Remove Successfully!!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        getCartItems();
        console.log(data);
      });
  };

  const getCartItems = useCallback(() => {
    const authUser = ReactSession.get('userData');
    const token = `${authUser?.user ? authUser?.token : userData?.token}`;

    fetch(
      `${api}/api/get-cart-items?customer_id=${
        authUser?.user ? authUser?.user.id : userData?.user.id
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setcartData(data.data);
        console.log(data);
      });
  }, []);

  const getCarSummary = useCallback(() => {
    const authUser = ReactSession.get('userData');
    const token = `${authUser?.user ? authUser?.token : userData?.token}`;
    fetch(`${api}/api/get-cart-summary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setorderSummary(data);
      });
  }, []);

  useEffect(() => {
    // const user = ReactSession.get('userData');
    setIsLoading(true);
    getCartItems();
    getCarSummary();
  }, [authUser]);

  return (
    <Page>
      {/* router base for server subdirectory */}
      <CartData.Provider
        value={{
          cartData,
          orderSummary,
          isLoading,
          removeFormCart,
          userData,
          setuserData,
          getCartItems,
        }}
      >
        <BrowserRouter basename={routerBasename}>
          <Routes />
        </BrowserRouter>
      </CartData.Provider>
    </Page>
  );
};

export default App;
