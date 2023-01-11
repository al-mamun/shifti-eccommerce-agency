import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const mock = [
  {
    title: 'High quality',
    subtitle:
      'We will always give you the opportunity to get acquainted with the instrument closer.',
  },
  {
    title: 'Musical instruments',
    subtitle:
      'Our employees are always ready to come to your aid in choosing musical instruments, be it a string, keyboard, percussion or any other instrument.',
  },
  {
    title: 'Free assistance',
    subtitle:
      'You will always get professional advice on the selection of musical instruments, equipment and accessories.',
  },
];

const QuickSearch = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box>
     
    </Box>
  );
};

export default QuickSearch;
