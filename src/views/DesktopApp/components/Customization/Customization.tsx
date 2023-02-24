/* eslint-disable react/no-unescaped-entities */
import React, {  useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { api } from 'api/config';
import parse from 'html-react-parser';

const Customization = (): JSX.Element => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [page_title, settitle] = useState([]);
  const [page_content, setContent] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [thumbnail2, setThumbnail2] = useState([]);

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
          console.log(data?.feature);
          settitle(data?.product_title);
          setContent(data?.product_content);
          setThumbnail(data?.product_content_banner);
          setThumbnail2(data?.product_thumbnail);
        });

      }, []);
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'primary'}
          align={'center'}
          className={'home_page_customazation_area_subtitle'}
        >
          CUSTOMIZATION
        </Typography>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
          className={'home_page_customazation_area_title'}
        >
           { parse(`${ page_title }`) }
        </Typography>
        <Typography
          variant="h6"
          align={'center'}
          color={'text.secondary'}
          data-aos={'fade-up'}
          className={'home_page_customazation_area_content'}
        >
          { parse(`${ page_content }`) }
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          justifyContent={'center'}
          marginTop={2}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth={isMd ? false : true}
            className={'book_a_call_home'}
          >
            Book A Call
          </Button>
          <Box
            component={Button}
            variant="outlined"
            color="primary"
            size="large"
            marginTop={{ xs: 2, sm: 0 }}
            marginLeft={{ sm: 2 }}
            fullWidth={isMd ? false : true}
            className={'view_template_home'}
          >
            View Templates
          </Box>
        </Box>
      </Box>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} sm={6} data-aos={'fade-up'}>
          <Grid container alignItems="center">
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
              className={'customaztion_product'}
              sx={{
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} data-aos={'fade-up'}>
          <Grid
            container
            alignItems="center"
            sx={{
              marginTop: { xs: 0, md: '40%' },
            }}
          >
            <Box
              component={'img'}
              loading="lazy"
              height={1}
              width={1}
              src={`${thumbnail2}`}
              alt="..."
              boxShadow={3}
              borderRadius={2}
              maxWidth={600}
              className={'customaztion_product'}
              sx={{
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customization;
