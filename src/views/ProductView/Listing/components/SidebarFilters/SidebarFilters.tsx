import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { api } from 'api/config';
import { Topbar, Sidebar } from './components';
import { ReactSession } from 'react-client-session';
import { useParams } from 'react-router-dom';
interface Props {
  children: React.ReactNode;
}

const SidebarFilters = ({ children }: Props): JSX.Element => {
  const theme = useTheme();
  const [totalN, totalData] = useState([]);
  const [post, setPost] = useState([]);
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (): void => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  ReactSession.setStoreType('sessionStorage');
  const { slug } = useParams();

  useEffect(() => {
    
    // const [Description, setDescription] = useState([]);
    // const [authorName, setAuthor] = useState([]);
    // const [postDate, setPostDate] = useState([]);
    // const [profileInamge, setAvatar] = useState([]);

    fetch(`${api}/api/frontend/category/total/product/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.total);
      
        totalData(data?.total);
      })

      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box display={'flex'}>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant={isMd ? 'permanent' : 'temporary'}
      />
      <Box marginLeft={{ xs: 0, md: 4 }} width={1}>
        <Topbar onSidebarOpen={handleSidebarOpen} />
        <Box paddingY={4}>{children}</Box>
        
      </Box>
    </Box>
  );
};

export default SidebarFilters;
