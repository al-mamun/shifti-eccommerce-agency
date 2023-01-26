import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import { api } from 'api/config';
import parse from 'html-react-parser';
const About = (): JSX.Element => {

  const [pageTitle, setPageTitle] = useState([]);
  const [SubPageTitle, setPageSubTitle] = useState([]);
  useEffect(() => {
    fetch(`${api}/api/frontend/job/page/content`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPageTitle(data?.about_page_title);
        setPageSubTitle(data?.about_page_content);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          align={'center'}
          color={'text.secondary'}
          sx={{ textTransform: 'uppercase' }}
          variant={'subtitle2'}
          fontWeight={600}
        >
          About
        </Typography>
        <Typography fontWeight={700} variant={'h4'} align={'center'}>
          {pageTitle}
        
        </Typography>
      </Box>
      { parse(`${ SubPageTitle }`) }
    
    </Box>
  );
};

export default About;
