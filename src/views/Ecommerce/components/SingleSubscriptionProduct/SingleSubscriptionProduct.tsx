import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Main from 'layouts/Main';

import Container from 'components/Container';
import { useParams } from 'react-router-dom';
import { api } from 'api/config';

const mock = [
  {
    title: 'Starter',
    subtitle: 'Is perfect for individual developers',
    price: { monthly: '$22', annual: '$190' },
    features: ['1 User', '1 App', 'Integrations'],
    isHighlighted: false,
  },
  {
    title: 'Pro',
    subtitle: 'For teams and advanced developers',
    price: { monthly: '$44', annual: '$390' },
    features: [
      'All in Starter plan',
      'Google Ads',
      'SSO via Google',
      'API access',
    ],
    isHighlighted: true,
  },
  {
    title: 'Enterprise',
    subtitle: 'Ideal for corporate companyes',
    price: { monthly: '$77', annual: '$690' },
    features: [
      'All features',
      'Email support',
      'Google Ads',
      'SSO via Google',
      'API access',
      'Facebook Ads',
    ],
    isHighlighted: false,
  },
];

const SingleSubscriptionProduct = (): JSX.Element => {
  const theme = useTheme();
  const { id } = useParams();
  const [subscriptions, setSubscriptions] = useState([]);
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [pricingOption, setPricingOption] = useState('annual');

  const handleClick = (event, newPricingOption): void => {
    setPricingOption(newPricingOption);
  };

  const renderToggler = () => (
    <Box display={'flex'} justifyContent={'center'} marginBottom={4}>
      <ToggleButtonGroup value={pricingOption} exclusive onChange={handleClick}>
        <ToggleButton
          value="annual"
          size={isMd ? 'large' : 'small'}
          sx={{
            backgroundColor:
              pricingOption === 'annual'
                ? `${theme?.palette.primary.light} !important`
                : 'transparent',
            border: `1px solid ${theme?.palette?.primary.main}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color:
                pricingOption === 'annual' ? 'common.white' : 'text.primary',
            }}
          >
            Annual
          </Typography>
        </ToggleButton>
        <ToggleButton
          value="monthly"
          size={isMd ? 'large' : 'small'}
          sx={{
            backgroundColor:
              pricingOption === 'monthly'
                ? `${theme?.palette?.primary?.light} !important`
                : 'transparent',
            border: `1px solid ${theme?.palette?.primary?.main}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color:
                pricingOption !== 'annual' ? 'common.white' : 'text.primary',
            }}
          >
            Monthly
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );

  useEffect(() => {
    console.log(id);
    fetch(`${api}/api/frontend/subscriptions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.product);
        setSubscriptions(data?.product);
      });
  }, []);

  return (
    <>
      <Main>
        <Container>
          <Box>
            <Box
              sx={{
                position: 'relative',
                backgroundColor: theme.palette.alternate.main,
                backgroundImage: `linear-gradient(120deg, ${theme.palette.background.paper} 0%, ${theme.palette.alternate.dark} 100%)`,
              }}
            >
              <Container position={'relative'} zIndex={3}>
                <Box>
                  <Box marginBottom={4}>
                    <Typography
                      variant="h3"
                      gutterBottom
                      align={'center'}
                      sx={{
                        fontWeight: 900,
                      }}
                    >
                      Flexible pricing options
                    </Typography>
                    <Typography
                      variant="h6"
                      component="p"
                      color="text.primary"
                      align={'center'}
                    >
                      We are founded by a leading academic and researcher in the
                      field of Industrial Systems Engineering.
                      <br />
                      For entrepreneurs, startups and freelancers. If you didn’t
                      find what you needed, these could help!
                    </Typography>
                  </Box>
                </Box>
              </Container>
            </Box>
            <Container>
              <Grid container spacing={4}>
                {subscriptions?.map((item, i) => (
                  <Grid item xs={12} md={4} key={i}>
                    <Box
                      component={Card}
                      height={1}
                      display={'flex'}
                      flexDirection={'column'}
                      variant={'outlined'}
                    >
                      <CardContent
                        sx={{
                          padding: 4,
                        }}
                      >
                        <Box marginBottom={2}>
                          <Typography
                            variant={'h4'}
                            fontWeight={600}
                            gutterBottom
                          >
                            {item?.sub_title}
                          </Typography>
                          <Typography color={'text.secondary'}>
                            {item?.subtitle}
                          </Typography>
                        </Box>
                        <Box
                          display={'flex'}
                          alignItems={'baseline'}
                          marginBottom={2}
                        >
                          <Typography variant={'h3'} fontWeight={700}>
                           
                              <span>${item?.price} </span>
                        
                          </Typography>
                          <Typography
                            variant={'subtitle1'}
                            color={'text.secondary'}
                            fontWeight={700}
                          >
                              <span>{ item?.type }</span>
                          </Typography>
                        </Box>
                        <Grid container spacing={1}>
                          {item?.features?.map((feature, j) => (
                            <Grid item xs={12} key={j}>
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
                                    bgcolor={theme?.palette?.primary?.main}
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
                                <ListItemText primary={feature?.title} />
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                      <Box flexGrow={1} />
                      <CardActions
                        sx={{ justifyContent: 'flex-end', padding: 4 }}
                      >
                        <Button size={'large'} variant={'contained'}>
                            Select Plan
                        </Button>
                      </CardActions>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Container>
      </Main>
    </>
  );
};

export default SingleSubscriptionProduct;
