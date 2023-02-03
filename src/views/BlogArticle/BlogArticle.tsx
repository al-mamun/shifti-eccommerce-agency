import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { api } from 'api/config';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { useParams } from 'react-router-dom';

import {
  Content,
  FooterNewsletter,
  Hero,
  SidebarArticles,
  SidebarNewsletter,
  SimilarStories,
} from './components';

const BlogArticle = (): JSX.Element => {

  const theme = useTheme();
  const { id } = useParams();
  const [blog_title, setBlogTitle] = useState([]);
  const [blogImage, setImage] = useState([]);
  const [Description, setDescription] = useState([]);

  useEffect(() => {
    // console.log(id);
    fetch(`${api}/api/frontend/blog/page/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data?.product);
        setBlogTitle(data?.product);
        setImage(data?.title);
        setDescription(data?.description);
      });
  }, []);

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Main colorInvert={true}>
      <Box>
        <Hero />
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Content />
            </Grid>
            <Grid item xs={12} md={4}>
              {isMd ? (
                <Box marginBottom={4}>
                  <SidebarArticles />
                </Box>
              ) : null}
              <SidebarNewsletter />
            </Grid>
          </Grid>
        </Container>
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            marginBottom: -1,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.alternate.main}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>
      <Box bgcolor={'alternate.main'}>
        <Container>
          <SimilarStories />
        </Container>
        <Container>
          <FooterNewsletter />
        </Container>
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            marginBottom: -1,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.background.paper}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>
    </Main>
  );
};


export default BlogArticle;
