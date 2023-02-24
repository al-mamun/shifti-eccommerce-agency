import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from 'layouts/Main';
import Container from 'components/Container';
import { Contact, Form, Hero, Newsletter } from './components';

const ContactPage = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Main>
      <Hero />
    
      <Contact />
      <Box bgcolor={'alternate.main'}>
        <Container>
          <Form />
        </Container>
      </Box>
      <Container>
        <Newsletter />
      </Container>
    </Main>
  );
};

export default ContactPage;
