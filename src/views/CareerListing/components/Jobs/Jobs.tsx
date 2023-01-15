import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const mock = [
  {
    title: 'Front-End Developer',
    location: 'Madrid',
    type: 'Remote',
    team: 'Consumer',
    subtitle: 'Responsible for design systems and brand management.',
  },
  {
    title: 'Community Manager',
    location: 'Paris',
    type: 'Full time',
    team: 'Consulting',
    subtitle: 'Responsible for creating life in our apps.',
  },
  {
    title: 'UX/UI Designer',
    location: 'Yerevan',
    type: 'Part time',
    team: 'Internal tools',
    subtitle: 'Help us make the best decisions with qualitative experiments.',
  },
  {
    title: 'Front-End Developer',
    location: 'Madrid',
    type: 'Remote',
    team: 'Internal tools',
    subtitle: 'Responsible for design systems and brand management.',
  },
  {
    title: 'Community Manager',
    location: 'Paris',
    type: 'Full time',
    team: 'Consulting',
    subtitle: 'Responsible for creating life in our apps.',
  },
  {
    title: 'UX/UI Designer',
    location: 'Yerevan',
    type: 'Part time',
    team: 'Consumer',
    subtitle: 'Help us make the best decisions with qualitative experiments.',
  },
  {
    title: 'Front-End Developer',
    location: 'Madrid',
    type: 'Remote',
    team: 'Consumer',
    subtitle: 'Responsible for design systems and brand management.',
  },
  {
    title: 'Community Manager',
    location: 'Paris',
    type: 'Full time',
    team: 'Consulting',
    subtitle: 'Responsible for creating life in our apps.',
  },
];

const Jobs = (): JSX.Element => {
  
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [categories, setCat] = useState([]);
  const [loctions, setLoc] = useState([]);
  useEffect(() => {
    fetch('https://mamundevstudios.com/shifti_api/public/api/frontend/job-opening', {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });


      fetch('https://mamundevstudios.com/shifti_api/public/api/frontend/job-categories', {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
      
        setCat(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

      fetch('https://mamundevstudios.com/shifti_api/public/api/frontend/job-location', {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((data) => {
      
        setLoc(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

 

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
          Open positions
        </Typography>
        <Typography fontWeight={700} variant={'h4'} align={'center'}>
          Current job openings
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          '.MuiOutlinedInput-root': {
            background: theme.palette.background.paper,
          },
        }}
      >
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel id="career-listing__jobs-role--label">Roles</InputLabel>
            <Select labelId="career-listing__jobs-role--label" label="Roles">
              <MenuItem value="">
                <em>All roles</em>
              </MenuItem>
              
              {categories.map((item, i) => (
                <MenuItem value={'item.name'}>{ item.name }</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel id="career-listing__jobs-role--label">Teams</InputLabel>
            <Select labelId="career-listing__jobs-role--label" label="Teams">
              <MenuItem value="">
                <em>All teams</em>
              </MenuItem>
              {categories.map((item, i) => (
              <MenuItem value={'consumer'}>Consumer</MenuItem>
              ))}
              <MenuItem value={'consulting'}>Consulting</MenuItem>
              <MenuItem value={'internal-tools'}>Internal tools</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel id="career-listing__jobs-role--label">
              Locations
            </InputLabel>
            <Select
              labelId="career-listing__jobs-role--label"
              label="Locations"
            >
              <MenuItem value="">
                <em>All locations</em>
              </MenuItem>
              {loctions.map((item, i) => (
              <MenuItem value={'item.location'}>{item.location}</MenuItem>
              ))}
              
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'row' }}
        flex={'1 1 100%'}
        justifyContent={{ sm: 'space-between' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        marginY={4}
      >
        <Box marginBottom={{ xs: 1, sm: 0 }}>
          <Typography variant={'h6'} fontWeight={700}>
            Design & UX, Engineering
          </Typography>
          <Typography color={'text.secondary'}>
            User experience and design are top priorities at theFront.
          </Typography>
        </Box>
        <Box
          paddingY={1 / 2}
          paddingX={1}
          bgcolor={'secondary.main'}
          borderRadius={2}
          marginRight={1}
        >
          <Typography
            variant={'caption'}
            fontWeight={700}
            sx={{ color: 'common.black' }}
          >
            {posts.length} openings
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        {posts.map((item, i) => (
          <Grid
            item
            xs={12}
            key={i}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              '&:last-child': {
                borderBottom: 0,
              },
            }}
          >
            <Box padding={2} display={'flex'} alignItems={'center'}>
              <Box
                display={'flex'}
                flexDirection={{ xs: 'column', sm: 'row' }}
                flex={'1 1 100%'}
                justifyContent={{ sm: 'space-between' }}
                alignItems={{ sm: 'center' }}
              >
                <Box marginBottom={{ xs: 1, sm: 0 }}>
                  <Typography variant={'subtitle1'} fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography color={'text.secondary'}>
                    {item.subtitle}
                  </Typography>
                </Box>
                <Typography color={'text.secondary'}>
                  {`${item.team} / ${item.location}`}
                </Typography>
              </Box>
              <Box marginLeft={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  endIcon={
                    <Box
                      component={'svg'}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width={12}
                      height={12}
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </Box>
                  }
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Jobs;
