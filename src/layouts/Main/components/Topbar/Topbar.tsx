/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
/*import Link from '@mui/material/Link';*/
import {Link} from 'react-router-dom';
import { NavItem } from './components';
import './topbar.css';
import { api } from 'api/config';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

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

  ReactSession.setStoreType("sessionStorage");
  
  const {
    landings: landingPages,
    secondary: secondaryPages,
    company: companyPages,
    account: accountPages,
    portfolio: portfolioPages,
    blog: blogPages,
  } = pages;

  const logOut = () =>{
    fetch( `${api}/api/customer/logout`)
    .then(() =>{
      navigate('/')
      const userData ={}
      ReactSession.set("userData", userData);
    })
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
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
        <Box className="menu_bar css-1mvbbh8-MuiTypography-root"  marginLeft={4}>
          <Link
            to="/"
            className="custom_link"
          >
            Home
          </Link>
        </Box>
        <Box marginLeft={4}>
          <Link
            to="/e-commerce"
            className="custom_link"
          >
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
          <NavItem
            title={'Account'}
            id={'account-pages'}
            items={accountPages}
            colorInvert={colorInvert}
          />
        </Box>
        <Box marginLeft={4}>
          <NavItem
            title={'Pages'}
            id={'secondary-pages'}
            items={secondaryPages}
            colorInvert={colorInvert}
          />
        </Box>

        <Box marginLeft={4}>
          <Link to="/blog-newsroom"
            className="custom_link"
          >
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
          <Link to="/contact-page"
            className="custom_link"
          >
            Contact
          </Link>
        </Box>
        <Box marginLeft={4}>
          <Link to="/cart-page"
           className="custom_link"
          >
            Cart
          </Link>
        </Box>
        <Box marginLeft={4}>
          <Button
            variant="contained"
            color="primary"
           onClick={()=> logOut()}
            size="large"
          >
            Log Out
          </Button>
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
