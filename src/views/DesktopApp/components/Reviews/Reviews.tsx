import React, {  useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { api } from 'api/config';
import parse from 'html-react-parser';
import Button from '@mui/material/Button';

const mock = [
  {
    title: 'Google Drive',
    subtitle:
      'A very simple and modern template with a very harmonious color scheme. Also the additional plugins like the statistics are great and fit perfectly into the overall picture.',
    icon: 'https://assets.maccarianagency.com/svg/logos/google-drive.svg',
  },
  {
    title: 'Google Ad Manager',
    subtitle:
      'A very simple and modern template with a very harmonious color scheme. Also the additional plugins like the statistics are great and fit perfectly into the overall picture.',
    icon: 'https://assets.maccarianagency.com/svg/logos/google-ad-manager.svg',
  },
  {
    title: 'Atlassian',
    subtitle:
      'Keep your entire team in sync with development and easily manage tasks, goals, and deadlines. Easily manage and edit any Adwords campaign inline to improve ROI with constant review.',
    icon: 'https://assets.maccarianagency.com/svg/logos/atlassian.svg',
  },
];

const Reviews = (): JSX.Element => {
  const theme = useTheme();

  const [post, setPost] = useState([]);

  useEffect(() => {
        fetch(`${api}/api/frontend/home/page/review/content`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
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
          className={'homepage_priceing_content'}
        >
          SERVICES WE DELIVER
        </Typography>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
          className={'homepage_priceing_title'}
        >
          Our Services And Integrations
        </Typography>
        
      </Box>
      <Grid container spacing={2}>
        {post.map((item, i) => (
          <Grid item xs={12} md={3} key={i}>
            <Box
              component={'a'}
              href={''}
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box
                component={Card}
                width={1}
                height={1}
                data-aos={'fade-up'}
                data-aos-delay={i * 100}
                data-aos-offset={100}
                data-aos-duration={600}
                flexDirection={'column'}
                display={'flex'}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                  className={'card_image_review'}
                >
                 
                  {/* <Box
                    component={Avatar}
                    width={{ xs: 60, md: 80 }}
                    height={{ xs: 60, md: 80 }}
                    marginBottom={2}
                    src={item.icon}
                    
                  /> */}
                  <Box className='itemIcon'>
                    { parse(`${ item.icon }`) }
                  </Box>
                  <Typography
                    variant={'h6'}
                    gutterBottom
                    className={'home_page_review_title'}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    color="text.secondary"
                    className={'home_page_review_sub_title'}
                  >
                    {item.subtitle}
                  </Typography>
                  <Box marginTop={2} display={'flex'} justifyContent={'center'} className={'learn_more_review'}>
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
                      className={'product_service_button'}
                    >
                      Learn More
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;
