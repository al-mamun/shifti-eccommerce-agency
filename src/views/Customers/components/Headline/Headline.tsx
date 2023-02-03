/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import { api } from 'api/config';

const Headline = (): JSX.Element => {
  const [pageTitle, setPageTitle] = useState([]);
  const [SubPageTitle, setPageSubTitle] = useState([]);
  useEffect(() => {
    fetch(`${api}/api/frontend/stroies/page/content`)
      .then((response) => response.json())
      .then((data) => {
      
        setPageTitle(data?.page_title);
        setPageSubTitle(data?.page_sub_title);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h3" gutterBottom>
          {pageTitle}
        </Typography>
        <Typography variant="h3" color={'primary'} fontWeight={700}>
          {SubPageTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default Headline;
