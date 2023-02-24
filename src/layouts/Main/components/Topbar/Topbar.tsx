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

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Menu, { MenuProps } from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    open={false}
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 250,
    padding:10,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      padding: 15,
      '& .MuiSvgIcon-root': {
        fontSize: 20,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    navigate(event);
  };

  return (
    <Box>
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
          <Box
            className="menu_bar css-1mvbbh8-MuiTypography-root"
            marginLeft={4}
          >
            <Link to="/" className="custom_link">
              Home
            </Link>
          </Box>
          <Box marginLeft={4}>
            <Link to="/product/list" className="custom_link">
              Pricing
            </Link>
          </Box>
          <Box marginLeft={4}>
            <Link to="/career-listing" className="custom_link">
              Careers
            </Link>
          </Box>
          <Box marginLeft={4}>
            <Link to="/contact-page" className="custom_link">
              Contact
            </Link>
          </Box>
          <Box marginLeft={4}>
            <Link to="/about" className="custom_link">
              About
            </Link>
          </Box>
          <Box marginLeft={4}>
            <NavItem
              title={'Support'}
              id={'company-pages'}
              items={companyPages}
              colorInvert={colorInvert}
            />
          </Box>


          {authUser?.user ? (
            <>
              

              <Box marginLeft={4}>
                
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  My Account
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem  onClick={() => handleMenu('/account')}>
                    <SupervisorAccountIcon color="primary"/>
                    My Account
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem  onClick={() => handleMenu('/cart-page')}>
                    <ShoppingCartIcon color="primary"/>
                    My Cart
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem style={{backgroundColor:"#377dff",color:"white",borderRadius:10,justifyContent:'center',marginTop:3}} onClick={() => logOut()}>
                     <span> Log out</span>
                  </MenuItem>
                </StyledMenu>
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
    </Box>
  );
};

export default Topbar;
