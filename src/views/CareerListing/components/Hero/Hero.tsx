import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import { api } from 'api/config';
import Container from 'components/Container';
import ReactDOM from 'react-dom/client';
import parse from 'html-react-parser';

const Hero = (): JSX.Element => {
  const theme = useTheme();
  const [pageTitle, setPageTitle] = useState([]);
  const [SubPageTitle, setPageSubTitle] = useState([]);
  useEffect(() => {
    fetch(`${api}/api/frontend/job/page/content`)
      .then((response) => response.json())
      .then((data) => {
        // ;
        setPageTitle(data?.page_title);
        setPageSubTitle(data?.page_sub_title);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: theme.palette.alternate.main,
        backgroundImage: `linear-gradient(120deg, ${theme.palette.background.paper} 0%, ${theme.palette.alternate.main} 100%)`,
        marginTop: -13,
        paddingTop: 13,
      }}
    >
      <Container>
        <Box>
          <Box
            marginBottom={{ xs: 0, sm: 4 }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Typography
              variant="h3"
              gutterBottom
              align={'center'}
              sx={{
                fontWeight: 900,
              }}
              className={'carrier_page_title'}
            >
             {pageTitle}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.primary"
              align={'center'}
              sx={{ marginBottom: 2 }}
              className={'carrier_sub_title'}
              
            >
              { parse(`${ SubPageTitle }`) }
            
            </Typography>
            
            <Box
              component={Button}
              variant="contained"
              color="primary"
              size="large"
              height={54}
              marginTop={{ xs: 2, md: 0 }}
              marginLeft={{ md: 2 }}
              className={'see_the_job'}
              endIcon={
                <Box
                  component={'svg'}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </Box>
              }
            >
              See job openings
            </Box>
            {/* <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={
                <svg
                  width={16}
                  height={16}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              }
            >
              See job openings
            </Button> */}
          </Box>
          
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
