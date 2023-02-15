import React, {  useEffect, useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { api } from 'api/config';
import parse from 'html-react-parser';

const mock = [
  {
    title: '20+',
    subtitle:
      'Comprehensive Templates for all businesses.',
    suffix: '+',
  },
  {
    title: '50%',
    subtitle:
      'Time Saved on Rostering and Management.',
    suffix: '%',
  },
  {
    title: '24/7',
    subtitle: 'Support Available at all times to keep you running.',
    suffix: '',
  },
];

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
          // console.log(data?.feature);
          settitle(data?.hub_title);
          setContent(data?.hub_content);
          setThumbnail(data?.hub_thumbnail);
        });

      }, []);

  const [viewPortEntered, setViewPortEntered] = useState(false);
  const setViewPortVisibility = (isVisible) => {
    if (viewPortEntered) {
      return;
    }

    setViewPortEntered(isVisible);
  };

  return (
    <Grid container spacing={4}>
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
      <Grid item container xs={12} md={6} alignItems={'center'}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'} className={'home_page_hub_content'}>
          <Box marginBottom={2}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ fontWeight: 700 }}
              className={'home_page_hub_title'}
            >
               { parse(`${ page_title }`) }
            </Typography>
          </Box>
          <Box className='hub_section_content_page'>{ parse(`${ page_content }`) } </Box>
          <Box>
            <Grid container spacing={2}>
              {mock.map((item, i) => (
                <Grid key={i} item xs={12} md={4} className={'counter_grid'}>
                  <Typography variant="h3" gutterBottom className='hub_header_counter_title'>
                    <Box fontWeight={600} className={'hub_counter_title'}>
                      {item.title}
                    </Box>
                  </Typography>
                  <Typography color="text.secondary" className={'sub_title_hub_card'} component="p">
                    {item.subtitle}

                    <Button
                      size={'large'}
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
                      className={'hub_service_button'}
                    >
                      Learn More
                    </Button>
                  </Typography>
                  
                </Grid>
              ))}
            </Grid>
          </Box>
        
          {/* <Box>
            <Grid container spacing={2}>
              {mock.map((item, i) => (
                <Grid key={i} item xs={12} md={4}>
                  <Typography variant="h3" gutterBottom>
                    <Box fontWeight={600}>
                      <VisibilitySensor
                        onChange={(isVisible) =>
                          setViewPortVisibility(isVisible)
                        }
                        delayedCall
                      >
                        <CountUp
                          duration={2}
                          end={viewPortEntered ? item.title : 0}
                          start={0}
                          suffix={item.suffix}
                        />
                      </VisibilitySensor>
                    </Box>
                  </Typography>
                  <Typography color="text.secondary" component="p">
                    {item.subtitle}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
