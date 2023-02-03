import React, {  useEffect, useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { api } from 'api/config';
import parse from 'html-react-parser';

const Hero = (): JSX.Element => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [page_title, settitle] = useState([]);
  const [page_content, setContent] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  useEffect(() => {
        fetch(`${api}/api/frontend/home/page/content`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((res) => res.json())
        .then((data) => {
          // ;
          settitle(data?.title);
          setContent(data?.content);
          setThumbnail(data?.thumbnail);
        });

      }, []);

  return (
    <Grid container spacing={4}>
      <Grid item container xs={12} md={6} alignItems={'center'}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              { parse(`${ page_title }`) }
            
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
            { parse(`${ page_content }`) }
           
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
            >
              Start now
            </Button>
            <Box
              component={Button}
              variant="outlined"
              color="primary"
              size="large"
              marginTop={{ xs: 2, sm: 0 }}
              marginLeft={{ sm: 2 }}
              fullWidth={isMd ? false : true}
            >
              Learn more
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <Box
          component={'img'}
          loading="lazy"
          height={1}
          width={1}
          src={`${thumbnail}`}
          alt="..."
          boxShadow={3}
          borderRadius={2}
          maxWidth={600}
          sx={{
            filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
