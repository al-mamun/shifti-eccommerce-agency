import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

import Container from 'components/Container';

import {
  Headline,
  Banner,
  Products,
  SidebarFilters,
  Newsletter,
  Partners,
} from './components';
import { Main } from 'layouts';
import { useParams } from 'react-router-dom';

const Listing = (): JSX.Element => {
  const { slug } = useParams();

  useEffect(() => {
    // console.log(slug);
  }, []);

  return (
    <Main>
      <Box bgcolor={'alternate.main'}>
        <Container paddingY={{ xs: 2, sm: 2.5 }}>
          <Headline />
        </Container>
      </Box>
      <Container paddingBottom={'0 !important'}>
        <Banner />
      </Container>
      <Container>
        <SidebarFilters>
          <Products />
        </SidebarFilters>
      </Container>
      <Box bgcolor={'alternate.main'}>
        <Container>
          <Newsletter />
        </Container>
      </Box>
      <Container>
        <Partners />
      </Container>
    </Main>
  );
};

export default Listing;
