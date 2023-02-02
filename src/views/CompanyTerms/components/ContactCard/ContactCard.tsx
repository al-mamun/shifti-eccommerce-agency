import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { api } from 'api/config';
import parse from 'html-react-parser';

const ContactCard = (): JSX.Element => {
  const theme = useTheme();

  const [page_content, setPageContent] = useState([]);

  useEffect(() => {
    
    fetch(`${api}/api/frontend/terms/condition/list?type=2`)
      .then((res) => res.json())
      .then((data) => {
        setPageContent(data.page_content);
     
      });
  }, []);
  return (
    <Box
      component={Card}
      boxShadow={0}
      border={`1px solid ${theme.palette.divider}`}
    >
      <Box padding={{ xs: 2, sm: 3 }}>
      { parse(`${ page_content }`) }
   
       
      </Box>
    </Box>
  );
};

export default ContactCard;
