import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import './sidenav.css';
import NavItem from './components/NavItem';

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

  const {
    landings: landingPages,
    secondary: secondaryPages,
    company: companyPages,
    account: accountPages,
    portfolio: portfolioPages,
    blog: blogPages,
  } = pages;

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
          <NavItem title={'Company'} items={companyPages} />
        </Box>
        <Box>
          <NavItem title={'Pages'} items={secondaryPages} />
        </Box>
        <Box>
          <NavItem title={'Account'} items={accountPages} />
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
        
      </Box>
    </Box>
  );
};

export default SidebarNav;
