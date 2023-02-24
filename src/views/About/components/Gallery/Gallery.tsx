import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';

const Gallery = (): JSX.Element => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const photos = [
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img23.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img23.jpg',
      rows: 2,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img25.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img25.jpg',
      rows: 1,
      cols: 2,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img22.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img22.jpg',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img24.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img24.jpg',
      rows: 1,
      cols: 1,
    },
    {
      src: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
      source: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
      rows: 1,
      cols: 2,
    },
  ];

  const photosToShow = isMd ? photos : photos.slice(0, photos.length - 1);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
          gutterBottom
          color={'text.secondary'}
          align={'center'}
          className={'our_team_title'}
        >
          Gallery
        </Typography>
        <Typography
          variant="h4"
          align={'center'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
          className={'about_page_title_global_center'}
        >
          Small team. Big hearts.
        </Typography>
        <Typography variant="h6" align={'center'} color={'text.secondary'} className={'about_page_content_global_center'}>
          Our team members are always striving to offer our customers the best option in such a vast market we work hard, challenge ourselves and are always looking to improve.
        </Typography>
      </Box>
      <Box>
        <Box className={'button_are_gallery'}>
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            height={54}
            marginTop={{ xs: 2, md: 0 }}
            marginLeft={{ md: 2 }}
            className={'open_the_gallery'}
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
            Open the gallery
          </Box>
      </Box>

        <ImageList
          variant="quilted"
          cols={4}
          rowHeight={isMd ? 300 : 220}
          gap={isMd ? 16 : 8}
        >
          {photosToShow.map((item, i) => (
            <ImageListItem
              key={i}
              cols={isMd ? item.cols || 1 : 2}
              rows={isMd ? item.rows || 1 : 1}
            >
              <img
                height={'100%'}
                width={'100%'}
                src={item.src}
                alt="..."
                loading="lazy"
                style={{
                  objectFit: 'cover',
                  filter:
                    theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                  cursor: 'poiner',
                  borderRadius: 8,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default Gallery;
