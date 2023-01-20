import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import './sidenav.css';
import NavItem from './components/NavItem';
import { api } from 'api/config';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { CartData } from 'context/CartContext';

interface Props {
  pages: {
    landings: Array<PageItem>;
    company: Array<PageItem>;
    account: Array<PageItem>;
    secondary: Array<PageItem>;
    blog: Array<PageItem>;
    portfolio: Array<PageItem>;
  };
}

const SidebarNav = ({ pages }: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const { userData, setuserData, cartCount } = useContext(CartData);

  console.log(cartCount);

  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    return authUser;
  }, []);

  useEffect(() => {
    setAuthUser(authData());
  }, [authData, userData]);

  const {
    landings: landingPages,
    secondary: secondaryPages,
    company: companyPages,
    account: accountPages,
    portfolio: portfolioPages,
    blog: blogPages,
  } = pages;

  const logOut = () => {
    fetch(`${api}/api/customer/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      navigate('/');
      const userData = {};
      setuserData({});
      ReactSession.set('userData', userData);
    });
  };

  const login = () => {
    navigate('/signin-simple');
  };

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="theFront"
          width={{ xs: 100, md: 120 }}
        >
          <Box
            component={'img'}
            src={
              mode === 'light'
                ? 'https://mamundevstudios.com/shifti_api/public/shifti_logo.png'
                : 'https://mamundevstudios.com/shifti_api/public/shifti_logo.png'
            }
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
      <Box className="menu_bar css-1mvbbh8-MuiTypography-root">
          <Link to="/" className="custom_link">
            Home
          </Link>
        </Box>
        <Box>
          <Link to="/e-commerce" className="custom_link">
            Product
          </Link>

          {/* <NavItem
            title={'Home'}
            id={'landing-pages'}
            items={landingPages}
            colorInvert={colorInvert}

          />*/}
        </Box>
        <Box>
          <NavItem title={'Company'} items={secondaryPages} />
        </Box>
       
        <Box>
          <Link to="/faq" className="custom_link">
            Faq
          </Link>
        </Box>
        <Box>
          <Link to="/blog-newsroom" className="custom_link">
            Blog
          </Link>
        </Box>
        <Box >
          <Link to="/contact-page" className="custom_link">
            Contact
          </Link>
        </Box>
        {authUser?.user ? (
          <>
            {/* <Box marginLeft={4}>
              <Link to="/cart-page" className="custom_link">
                Cart
              </Link>
            </Box> */}

            <Box>
              <NavItem
                title={'Account'}
                items={portfolioPages}
              />
            </Box>

            <Box marginLeft={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => logOut()}
                size="large"
              >
                Log Out
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box marginLeft={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => login()}
                size="large"
              >
                Log in
              </Button>
            </Box>

            <Box marginLeft={4}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/signup-simple')}
                size="large"
              >
                Sign up
              </Button>
            </Box>
          </>
        )}
      
        
      </Box>
    </Box>
  );
};

export default SidebarNav;
