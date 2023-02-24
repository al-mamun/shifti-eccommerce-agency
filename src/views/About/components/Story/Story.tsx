/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { api } from 'api/config';
import parse from 'html-react-parser';

const Story = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [story_title, setStoryTitle] = useState([]);
  const [story_content, setStoryContent] = useState([]);
  const [story_thumbnail, setStoryThumbnail] = useState([]);

  useEffect(() => {
    
    fetch(`${api}/api/frontend/about/page/content?type=2`)
      .then((res) => res.json())
      .then((data) => {
        setStoryTitle(data.story_title);
        setStoryContent(data.story_content);
        setStoryThumbnail(data.story_thumbnail);
      });
  });

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column'}>
        <Grid item container alignItems={'center'} xs={12} md={6}>
          <Box>
            <Typography variant={'h4'} gutterBottom sx={{ fontWeight: 700 }}  className={'about_us_story_title'}>
            { parse(`${ story_title }`) }
            </Typography>
            <Typography component={'p'}   className={'about_us_story_content'}>
              { parse(`${ story_content }`) }
             
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Box maxWidth={500} width={1}>
            <Box
              component={'img'}
              src={
                'https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration1.svg'
              }
              width={1}
              height={1}
              sx={{
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Story;
