/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable semi */
import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { api } from './../api/config';
// import { useNavigate } from 'react-router-dom';

export const CartData = createContext(null);

const CartContext = ({ children }) => {
  const [cartData, setcartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSummary, setorderSummary] = useState({});
  const [userData, setuserData] = useState(null);
  // const [authUser, setAuthUser] = useState(null);
  const [cartCount, setcartCount] = useState(0);
  const [myOrdersData, setMyOrdersData] = useState([]);
  const [CardData, setCardData] = useState(null);
  //   const navigate = useNavigate();

  const authData = () => {
    // const authUser = ReactSession.get('userData');
    console.log(userData);
    if (userData === null) {
      const userDataFormSession = sessionStorage.getItem('__react_session__');
      const data = JSON.parse(userDataFormSession);
      const usersInfo = data.userData;
      setuserData(usersInfo);
      console.log(usersInfo);
    }
  };

  const UpdateAllData = () => {
    getCartItems();
    getCartSummary();
    cartItemCount();
  };

  const getMyOrders = () => {
    authData();

    if (userData?.user) {
      fetch(`${api}/api/get-my-order`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setMyOrdersData(data?.data);
        });
    }
  };

  const updateCartItem = (id, qty, action) => {
    authData();
    const bodyData = {
      type: `${action === 1 ? 'increase' : 'decrease'}`,
      quantity: qty,
    };
    if (userData?.user) {
      fetch(`${api}/api/update-cart-quantity/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData?.token}`,
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
    //     const token = `${authUser?.user ? userData?.user ? userData?.token : authUser?.token : userData?.token}`;

    authData();
    console.log(userData);
    if (userData?.user) {
      fetch(`${api}/api/get-cart-items-count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setcartCount(data);
        });
    }
  };

  const addToCart = (id) => {
    authData();
    const list = {
      customer_id: `${userData?.user?.id}`,
      product_id: id,
    };
    // const token = `${userData?.user ? userData?.token : authUser?.token}`;
    fetch(`${api}/api/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData?.token}`,
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
    //     const token = `${authUser?.user ? userData?.user ? userData?.token : authUser?.token : userData?.token}`;
    console.log(id);
    authData();

    if (userData?.user) {
      fetch(`${api}/api/delete-cart-item/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData?.token}`,
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

  const getCartItems = () => {
    authData();
    console.log(userData);
    if (userData?.user) {
      fetch(`${api}/api/get-cart-items?customer_id=${userData?.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setcartData(data.data);
        });
    }
  };

  const getCartSummary = () => {
    authData();
    if (userData?.user) {
      fetch(`${api}/api/get-cart-summary`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userData?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setorderSummary(data);
        });
    }
  };

  useEffect(() => {
    authData();
  }, [userData]);

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
        getMyOrders,
        myOrdersData,
        cartItemCount,
        authData,
        getCartSummary,
        CardData,
        setCardData,
      }}
    >
      {children}
    </CartData.Provider>
  );
};

export default CartContext;
