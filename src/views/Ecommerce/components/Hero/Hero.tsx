import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { colors } from '@mui/material';

const Hero = (): JSX.Element => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  useEffect(() => {
    fetch('https://mamundevstudios.com/shifti_api/public/api/frontend/display/products/list')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
       
        {posts.map((item, i) => (
          <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
            <Box marginBottom={2}>
              <Typography
                variant="h3"
                color="text.primary"
                sx={{ fontWeight: 700 }}
              >
                <Typography
                  color={'primary'}
                  component={'span'}
                  variant={'inherit'}
                  sx={{
                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {item.title}
                  
                </Typography>
                like never before.
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography variant="h6" component="p" color="text.secondary">
            
                {item.content}
            
              </Typography>
                
              <Typography
                variant="h3"
                color="text.primary"
                sx={{ fontWeight: 700, color: colors.red[400] }}
              >
                ${item.price}
              </Typography>
              <Box
                component={Button}
                variant="contained"
                color="primary"
                size="large"
                height={54}
                marginTop={2}
              >
                Discover the offer
              </Box>
            </Box>
         
          <Box
            paddingX={2}
            paddingY={1}
            bgcolor={'alternate.dark'}
            borderRadius={2}
          >
            {posts.map((items, i) => (
              <Typography variant="body1" component="p">
              {item.sub_content}
                
              </Typography>
              ))}
          </Box>
        </Box>
         ))}
      </Grid>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
      >
        {posts.map((item, i) => (
        <Box
          component={'img'}
          loading="lazy"
          height={1}
          width={1}
          src={item.media}
          alt="..."
          maxWidth={600}
        />
        ))}
      </Grid>
    </Grid>
  );
};

export default Hero;
