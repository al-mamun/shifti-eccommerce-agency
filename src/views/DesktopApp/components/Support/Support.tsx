/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { api } from 'api/config';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
const mock = [
  {
    name: 'Clara Bertoletti',
    title: 'Junior Designer',
    avatar: 'https://assets.maccarianagency.com/avatars/img1.jpg',
  },
  {
    name: 'Jhon Anderson',
    title: 'Senior Frontend Developer',
    avatar: 'https://assets.maccarianagency.com/avatars/img2.jpg',
  },
  {
    name: 'Chary Smith',
    title: 'SEO at Comoti',
    avatar: 'https://assets.maccarianagency.com/avatars/img3.jpg',
  },
  {
    name: 'Clara Bertoletti',
    title: 'Junior Designer',
    avatar: 'https://assets.maccarianagency.com/avatars/img4.jpg',
  },
];

const Support = (): JSX.Element => {
  const theme = useTheme();
  const [cardNumber, setCardNumber] = useState([]);
  const [team_title, setTeamTitle] = useState([]);
  const [team_content, setTeamContent] = useState([]);
  const [feature, setFeature] = useState([]);

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
      setTeamTitle(data?.team_title);
      setTeamContent(data?.team_content);
      setFeature(data?.feature);
    });

    fetch(`${api}/api/frontend/team/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data?.address);
      setCardNumber(data);
    });

  }, []);


  return (
    <Box>
      <Box marginBottom={2}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          Support Team
        </Typography>
        <Typography variant={'h4'} sx={{ fontWeight: 700 }} align={'center'}>
          {team_title}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align={'center'}
        >{ parse(`${ team_content }`) }
          
      
        </Typography>
        <Box marginTop={2} display={'flex'} justifyContent={'center'}>
          <Link
            to={'/contact-page/'}
            style={{ textDecoration: 'none' }}
          >
            <Button
              color={'primary'}
              variant={'contained'}
              size={'large'}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  width={20}
                  height={20}
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              }
            >
              Contact us
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        marginBottom={4}
        width={1}
        display={'flex'}
        justifyContent={'center'}
      >
        <Box
          paddingBottom={{ xs: 1, md: 0 }}
          display={'flex'}
          overflow={'auto'}
        >
          {feature.map((item, i) => (
            <Box
              key={i}
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
              flex={'0 0 auto'}
              marginX={2}
            >
              <Box
                component={ListItem}
                disableGutters
                width={'auto'}
                padding={0}
              >
                <Box
                  component={ListItemAvatar}
                  minWidth={'auto !important'}
                  marginRight={2}
                >
                  <Box
                    component={Avatar}
                    bgcolor={'secondary.main'}
                    width={20}
                    height={20}
                  >
                    <svg
                      width={12}
                      height={12}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Box>
                </Box>
                <ListItemText primary={item} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Grid container spacing={2}>
        {cardNumber.map((item, i) => (
          <Grid item xs={6} md={3} key={i}>
            <ListItem
              disableGutters
              data-aos={'fade-up'}
              data-aos-delay={i * 100}
              data-aos-offset={100}
              data-aos-duration={600}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
              }}
            >
              <ListItemAvatar>
                <Box
                  component={Avatar}
                  width={{ xs: 80, sm: 80, md: 120 }}
                  height={{ xs: 80, sm: 80, md: 120 }}
                  src={item.avatar}
                  marginRight={2}
                />
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={item.title} />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Support;
