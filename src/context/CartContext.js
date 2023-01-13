/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable semi */
import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import { useCallback } from 'react';
import { api } from './../api/config';
import { useNavigate } from 'react-router-dom';

export const CartData = createContext(null);

const CartContext = ({ children }) => {
  const [cartData, setcartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSummary, setorderSummary] = useState({});
  const [userData, setuserData] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [cartCount, setcartCount] = useState(0);
  //   const navigate = useNavigate();

  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    setAuthUser(authUser);
    return authUser;
  }, []);

  const UpdateAllData = () => {
    getCartItems();
    getCarSummary();
    cartItemCount();
  };

  useEffect(() => {
    authData();
  }, []);

  const updateCartItem = (id, qty, action) => {
    console.log(id, qty, action);
    const bodyData = {
      type: `${action === 1 ? 'increase' : 'decrease'}`,
      quantity: qty,
    };
    if (authUser?.token) {
      fetch(`${api}/api/update-cart-quantity/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${authUser?.token}`,
        },
        body: JSON.stringify(bodyData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          UpdateAllData();
        });
    }
  };

  const cartItemCount = () => {
    //     const token = `${authUser?.user ? authUser?.token : userData?.token}`;

    if (authUser?.token) {
      fetch(`${api}/api/get-cart-items-count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${authUser?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setcartCount(data);
        });
    }
  };

  const addToCart = (id) => {
    const list = {
      customer_id: `${authUser?.user?.id}`,
      product_id: id,
    };
    const token = `${authUser?.token}`;
    fetch(`${api}/api/add-to-cart`, {
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
        UpdateAllData();
        if (data?.message == 'Unauthenticated.') {
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
          //           setTimeout(() => {
          //             navigate('/signin-simple');
          //           }, 5000);
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
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFormCart = (id) => {
    //     const token = `${authUser?.user ? authUser?.token : userData?.token}`;
    console.log(id);

    if (authUser?.token) {
      fetch(`${api}/api/delete-cart-item/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${authUser?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          UpdateAllData();
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
        });
    }
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
    cartItemCount();
  }, [authUser]);

  return (
    <CartData.Provider
      value={{
        cartData,
        orderSummary,
        isLoading,
        removeFormCart,
        userData,
        setuserData,
        getCartItems,
        cartCount,
        addToCart,
        updateCartItem,
      }}
    >
      {children}
    </CartData.Provider>
  );
};

export default CartContext;
