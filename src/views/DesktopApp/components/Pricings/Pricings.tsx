import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Main from 'layouts/Main';
import { ReactSession } from 'react-client-session';
import Container from 'components/Container';
import { useParams } from 'react-router-dom';
import { api } from 'api/config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import parse from 'html-react-parser';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import './custom.css';
import {Link} from 'react-router-dom';

const mock = [
  {
    title: 'Starter',
    subtitle: 'Is perfect for individual developers',
    price: { monthly: '$33', annual: '$3' },
    features: [
      'All features',
      'Lifetime updates',
      'Tech support',
     
    ],
    isHighlighted: false,
  },
  {
    title: 'Pro',
    subtitle: 'For teams and advanced developers',
    price: { monthly: '$44', annual: '$4' },
    features: [
      'All features',
      'Lifetime updates',
      'Tech support',
     
    ],
    isHighlighted: true,
  },
  {
    title: 'Enterprise',
    subtitle: 'Ideal for corporate companyes',
    price: { monthly: '$604', annual: '$60' },
    features: [
      'All features',
      'Lifetime updates',
      'Tech support',
     
    ],
    isHighlighted: false,
  },
  {
    title: 'Enterprise',
    subtitle: 'Ideal for corporate companyes',
    price: { monthly: '$255', annual: '$25' },
    features: [
      'All features',
      'Lifetime updates',
      'Tech support',
     
    ],
    isHighlighted: false,
  },
];

const Pricing = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [product_title, setSubscriptionsTitle] = useState([]);
  const [product_content, setSubscriptionsContent] = useState([]);
  // const [moduleProduct, setModuleProduct] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [blogList, setPosts] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [pricingOption, setPricingOption] = useState('monthly');

 const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    newPricingOption: string | null,
  ) => {
    if (newPricingOption !== null) {
      setPricingOption(newPricingOption);
    }
  };

const renderToggler = () => (
    <Box display={'flex'} justifyContent={'center'} marginBottom={4}>
      <ToggleButtonGroup value={pricingOption} exclusive onChange={handleClick}
        className={'toggleButton'}
      >
        <ToggleButton
          value="annual"
          size={isMd ? 'large' : 'small'}
          sx={{
            backgroundColor:
              pricingOption === 'annual'
                ? `${theme.palette.primary.light} !important`
                : 'transparent',
            border: `1px solid ${theme.palette.primary.main}`,
          }}
          className={'home_annual_button_btn home_switch_button'}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color:
                pricingOption === 'annual' ? 'common.white' : 'text.primary',
            }}
            className={'home_annual_button'}
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
                ? `${theme.palette.primary.light} !important`
                : 'transparent',
            border: `1px solid ${theme.palette.primary.main}`,
          }}
          className={'home_monthly_button_btn home_switch_button'}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color:
                pricingOption !== 'annual' ? 'common.white' : 'text.primary',
            }}
            className={'monthly_button_home_page'}
          >
            Monthly
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );

  function addToCart(subscriber_id, product_id) {
    const list = {
      customer_id: `${authUser?.user?.id}`,
      subscriber_id: subscriber_id,
      product_id: product_id,
    };
    const token = `${authUser?.token}`;
    fetch(`${api}/api/subcraption-reqeust`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == 'Unauthenticated.') {
          setErrorMessage('test');
          toast.error(data.msg, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setTimeout(() => {
            navigate('/signin-simple');
          }, 5000);
          return;
        }
        toast.success(data?.msg, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(() => {
          navigate('/subcription-check-out');
        }, 2000);
      });
  }      
  useEffect(() => {

    fetch(`${api}/api/frontend/subscriptions/Test-of-subcraption-product?is_homepage=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Hi' + data?.product);
        setSubscriptions(data?.product);
        setSubscriptionsTitle(data?.title);
        setSubscriptionsContent(data?.content);
      });
    
    fetch(`${api}/api/frontend/blog/list?limit=3`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });

  }, []);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'primary'}
          align={'center'}
          className={'homepage_priceing_content'}
        >
          Pricing
        </Typography>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
          className={'homepage_priceing_title'}
        >
          Pricing Range
        </Typography>
        <Typography
          variant="h6"
          className={'homepage_priceing_subtitle'}
        >
          Pick the best Plan for your businesses needs, aswell as our various add-ons that are available
        </Typography>
        {renderToggler()}
        
      </Box>
      <Container className={'ultimate_priceservice_area'}>
          <Box
            style={{
              width: '100%',
              margin:'20px auto'
            }}
          >
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {/* Same as */}
            <ToastContainer />
           
            <Container>
              <Grid container spacing={3}>
                {subscriptions?.map((item, i) => (
                  <Grid item xs={12} md={3} key={i}
                    style={{
                      overflow: 'visible !important;',
                      position:'relative',
                    }}
                    className={item.is_active ? item.is_active:'grid_item'}
                 
                  >
                    <Box
                      component={Card}
                      height={1}
                      display={'flex'}
                      flexDirection={'column'}
                      variant={'outlined'}
                      className="box_area"
                      style={{
                        overflow: 'visible !important',
                        marginBottom:'20px'
                      }}
                    >
                      <Box marginBottom={2}
                       className="header_price"
                       style={{
                         background: '#F7F8FB',
                         padding:'15px 13px',
                         marginTop:'-50px',
                         marginLeft:'4%',
                         width:'92%',
                         borderRadius:'8px',
                         minHeight:'120px',
                       }}
                       >
                         <Typography
                           variant={'h4'}
                           fontWeight={600}
                           gutterBottom
                           className={'price_box_title'}
                         >
                           {item?.title}
                         </Typography>
                          <Typography color={'text.secondary'}
                            className={'price_box_sub_title'}
                          >
                           {item?.sub_title}
                         </Typography>
                       </Box>
                      <CardContent
                        sx={{
                          padding: 4,
                          overflow: 'visible !important',
                        }}
                        className={'grid_content'}

                      >
                        
                        <Grid container spacing={1}>
                          <Grid container spacing={1}>
                            {item?.module?.map((feature, j) => (
                              <Grid item xs={12} key={j}>
                                <Typography
                                  component={'p'}
                                  align={'left'}
                                
                                >
                                <Box
                                  component={Avatar}
                                  bgcolor={theme?.palette?.primary?.main}
                                  width={20}
                                  height={20}
                                  style={{
                                    float: 'left',
                                    marginRight:'10px',
                                    fontSize:'14px'
                                  }}
                                  className={'grid_item_name'}
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
                                  <span className="home_page_grid_content_list">{feature?.module_title}</span>
                                </Typography>
                              </Grid>
                              
                            ))}
                          </Grid>
                        </Grid>
                       
                        
                      </CardContent>
                      <Box
                          display={'flex'}
                          alignItems={'baseline'}
                          marginBottom={2}
                          flexGrow={1}
                          style={{
                            position:'absolute',
                            bottom: '160px',
                            width:'100%'
                          }}
                        >
                          <CardActions
                              sx={{ justifyContent: 'flex-end', padding: 2 }}
                              className={'boxCard'}
                            >
                            <Box marginBottom={2}
                              style={{
                                width:'100%',
                                margin: '0 auto'
                              }}
                              className="price_section"
                              >
                              <Typography variant={'h3'} fontWeight={700}
                               className={'price_section_text'}
                              >
                                  <span className={'price_section_left'}> ${pricingOption === 'annual'
                        ? item.annual
                        : item.monthly}
                         /</span> <span className={'price_section_type'}> {pricingOption === 'annual'
                        ? 'Year'
                        : 'Month' } </span>
                              </Typography>
                            </Box>
                            <Box marginBottom={2}
                              style={{
                                width:'100%',
                                clear:'both'
                              }}
                              className="per_user"
                              >
                              <Typography
                                variant={'subtitle1'}
                                color={'text.secondary'}
                                fontWeight={700}
                                style={{
                                  textAlign:'center',
                                }}
                                className={'per_user_text'}
                              >
                                <span>Per User</span>
                              </Typography>
                            </Box>
                            </CardActions>
                         
                        </Box>
                      <Box flexGrow={1} />
                        <CardActions
                          sx={{ justifyContent: 'flex-end', padding: 4 }}
                        >
                          <Button 
                            size={'large'} 
                            variant={'contained'}
                            onClick={() => addToCart(item.id,item.product_id)}
                            className="addToOrder"
                            style={{
                              width: 'rgba(55, 125, 255, 0.1) !important'
                            }}
                            
                          >
                              Add To Order
                          </Button>
                        </CardActions>
                      </Box>
                  </Grid>
                ))}
              </Grid>
              <Grid
          item
          container
          sx={{ mt: 5 }}
          xs={12}
          md={12}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box component={Card} bgcolor={theme.palette.primary.main}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: { sm: 4 },
              }}
            >
              <Box color={theme.palette.common.white} marginBottom={4}>
                <svg
                  width={80}
                  height={80}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </Box>
              <Typography
                variant={'h4'}
                gutterBottom
                sx={{ fontWeight: 600, color: theme.palette.common.white }}
              >
                Enterprise
              </Typography>
              <Typography
                gutterBottom
                align={'center'}
                sx={{ color: theme.palette.common.white }}
              >
                Learn More About our Enterprise options for Larger Businesses 
              </Typography>
            
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size={'large'} sx={{ color: theme.palette.common.white }}>
                Contact sales
              </Button>
            </CardActions>
          </Box>
        </Grid>
            </Container>
            
          </Box>
        </Container>
    </Box>
  );
};

export default Pricing;
