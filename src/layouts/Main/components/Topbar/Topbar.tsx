/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
/*import Link from '@mui/material/Link';*/
import { Link } from 'react-router-dom';
import { NavItem } from './components';
import './topbar.css';
import { api } from 'api/config';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
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

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSidebarOpen: () => void;
  pages: {
    landings: Array<PageItem>;
    company: Array<PageItem>;
    account: Array<PageItem>;
    secondary: Array<PageItem>;
    blog: Array<PageItem>;
    portfolio: Array<PageItem>;
  };
  colorInvert?: boolean;
}

const Topbar = ({
  onSidebarOpen,
  pages,
  colorInvert = false,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const { userData, setuserData, cartCount } = useContext(CartData);

  // console.log(cartCount);

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
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
      className={'header_top'}
    >
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
            mode === 'light' && !colorInvert
              ? 'https://mamundevstudios.com/shifti_api/public/shifti_logo.png'
              : 'https://mamundevstudios.com/shifti_api/public/shifti_logo.png'
          }
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box className="menu_bar css-1mvbbh8-MuiTypography-root" marginLeft={4}>
          <Link to="/" className="custom_link">
            Home
          </Link>
        </Box>
        <Box marginLeft={4}>
          <Link to="/product/list" className="custom_link">
            Product
          </Link>

          {/* <NavItem
            title={'Home'}
            id={'landing-pages'}
            items={landingPages}
            colorInvert={colorInvert}

          />*/}
        </Box>
        <Box marginLeft={4}>
          <NavItem
            title={'Company'}
            id={'company-pages'}
            items={companyPages}
            colorInvert={colorInvert}
          />
        </Box>

        <Box marginLeft={4}>
          <Link to="/faq" className="custom_link">
            Faq
          </Link>
        </Box>

        <Box marginLeft={4}>
          <Link to="/blog" className="custom_link">
            Blog
          </Link>
        </Box>
        {/*<Box marginLeft={4}>
          <NavItem
            title={'Portfolio'}
            id={'portfolio-pages'}
            items={portfolioPages}
            colorInvert={colorInvert}
          />
        </Box>*/}
        <Box marginLeft={4}>
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

            <Box marginLeft={4}>
              <NavItem
                title={'Account'}
                id={'account-pages'}
                items={accountPages}
                colorInvert={colorInvert}
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
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 5 }}>
          <Link to="/cart-page" style={{ textDecoration: 'none' }}>
            <IconButton aria-label="cart">
              <StyledBadge
                badgeContent={`${cartCount?.count ? cartCount?.count : 0}`}
                color="secondary"
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
