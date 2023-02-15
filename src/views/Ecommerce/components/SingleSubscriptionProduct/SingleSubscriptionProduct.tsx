import React, { useState, useEffect, useCallback } from 'react';
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
const mock1 = [
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    companyLogo:
      'https://assets.maccarianagency.com/svg/logos/airbnb-original.svg',
    description:
      'Unforgettable trips start with Airbnb. Find adventures nearby or in faraway places and access unique homes, experiences, and places around the world.',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img22.jpg',
    companyLogo:
      'https://assets.maccarianagency.com/svg/logos/amazon-original.svg',
    description:
      'Free delivery on millions of items with Prime. Low prices across earth\'s biggest selection of books, music, DVDs, electronics, computers, software',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img24.jpg',
    companyLogo:
      'https://assets.maccarianagency.com/svg/logos/fitbit-original.svg',
    description:
      'Find your fit with Fitbit\'s family of fitness products that help you stay motivated and improve your health by tracking your activity, exercise, food, weight and sleep.',
  },
];
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
const features = [
  {
    title: '1 User',
    id: 1,
  },
  {
    title: '1 App',
    id: 2,
  },
  {
    title: 'Integrations',
    id: 3,
  },
  {
    title: 'Google Ads',
    id: 4,
  },
  {
    title: 'SSO via Google',
    id: 5,
  },
  {
    title: 'API access',
    id: 6,
  },
  {
    title: 'Facebook',
    id: 7,
  },
];

const pricing = [
  {
    title: 'Starter',
    price: {
      monthly: 22,
      annual: 210,
    },
    features: [1, 2, 3, 7],
    isHighlighted: false,
    isButtonText: false,
  },
  {
    title: 'Intermediate',
    price: {
      annual: 420,
      monthly: 44,
    },
    features: [1, 3, 4, 5],
    isHighlighted: true,
    isButtonText: false,
  },
  {
    title: 'Pro',
    price: {
      annual: 420,
      monthly: 44,
    },
    features: [1, 3, 4, 5],
    isHighlighted: false,
    btnText: 'Get starter',
    isButtonText: true,
  },
  {
    title: 'Ultimate',
    price: {
      annual: 740,
      monthly: 77,
    },
    features: [1, 2, 3, 4, 5, 6, 7],
    isHighlighted: true,
    btnText: 'Get Pro',
    isButtonText: true,
  },
  {
    title: 'Enterprise',
    price: {
      annual: 740,
      monthly: 77,
    },
    features: [1, 2, 3, 4, 5, 6, 7],
    isHighlighted: false,
    btnText: 'Contact us',
    isButtonText: true,
  },
];
interface FaqGroupItemProps {
  title: string;
  items: Array<{
    title: string;
    subtitle: string;
  }>;
}
const FaqGroupItem = ({ title, items }: FaqGroupItemProps): JSX.Element => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://mamundevstudios.com/shifti_api/public/admin_faq/api/product')
      .then((response) => response.json())
      .then((data) => {
      
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box>
     
      <Box style={{
              padding: '0px 20px',
             
            }}>
        {posts.map((item, i) => (
          <Box
            component={Accordion}
            key={i}
            padding={1}
            marginBottom={2}
            sx={{
              '&::before': {
                display: 'none',
              },
            }}
            style={{
              marginBottom: '0px',
              borderBottom: '1px solid rgba(45, 55, 72, 0.3)',
              borderRadius: '0px !important',
              boxShadow:'none'
            }}
            className={'faq_content_title'}
          >
            <Box
              component={AccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel1a-header--${i}`}
              className={'faq_content_title_para'}
            >
              <Typography fontWeight={600}>{item.title}</Typography>
            </Box>
            <AccordionDetails className={'faq_content_acc'}>
              <Typography style={{
                  color: '#646E73',
              }}
              className={'faq_content_paras'}
            >
              {item.subtitle}
              </Typography>
            </AccordionDetails>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const SingleSubscriptionProduct = (): JSX.Element => {
  
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [product_title, setSubscriptionsTitle] = useState([]);
  const [product_content, setSubscriptionsContent] = useState([]);
  // const [moduleProduct, setModuleProduct] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [unlimlimtedSubscriptions, setUnlimlimtedSubscriptions] = useState([]);
  const [blogList, setPosts] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const { mode } = theme.palette;

  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    return authUser;
  }, []);

  useEffect(() => {
    setAuthUser(authData());
    console.log(authUser);
  }, [authData]);
  const { id } = useParams();
  
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
      <ToggleButtonGroup value={pricingOption} exclusive onChange={handleClick}>
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
          className={'annual_button_btn switch_button'}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color:
                pricingOption === 'annual' ? 'common.white' : 'text.primary',
            }}
            className={'annual_button'}
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
          className={'monthly_button_btn switch_button'}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color:
                pricingOption !== 'annual' ? 'common.white' : 'text.primary',
            }}
            className={'monthly_button'}
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

    console.log(id);
    fetch(`${api}/api/frontend/subscriptions/Test-of-subcraption-product?is_product_page=1`)
    .then((res) => res.json())
    .then((data) => {
      console.log('Hi' + data?.product);
      setSubscriptions(data?.product);
      setSubscriptions(data?.product);
      setSubscriptionsTitle(data?.title);
      setSubscriptionsContent(data?.content);
    });

    fetch(`${api}/api/frontend/subscriptions/Test-of-subcraption-product?is_ultimate_product=1`)
    .then((res) => res.json())
    .then((data) => {
      
      setUnlimlimtedSubscriptions(data?.product);
      
    }); 
    
    fetch(`${api}/api/frontend/blog/list?limit=3`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });

  }, []);

  return (
    <>
      <Main>
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
                  className={'product_page_title'}
                >
                  Flexible pricing options
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.primary"
                  align={'center'}
                  className={'product_page_content'}
                >
                  From a small town cafe to the largest corporate chain, 
                  Shifti offers affordable and flexible  <br /> pricing options with a range of features,    
                  each tier supports your individual needs <br /> and requirements.
                </Typography>
              </Box>
              {renderToggler()}
            </Box>
          </Container>
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
            <Box>
              <Box marginBottom={4}
                className={'service_top'}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  align={'center'}
                  sx={{
                    fontWeight: 900,
                  }}
                  className="service_fee"
                >
                  Service Fee
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.primary"
                  align={'center'}
                  className="all_fee"
                >
                  Compulsory fee for all businesses
                </Typography>
                {unlimlimtedSubscriptions?.map((item, i) => (
                <Typography
                  variant="h6"
                  component="p"
                  color="text.primary"
                  align={'center'}
                  className={'company_month'}
                >
                  <span className={'price_per_month'}>${pricingOption === 'annual'
                                    ? item.annual
                                    : item.monthly}</span> / per Company/{pricingOption === 'annual'
                                    ? 'Year'
                                    : 'Month' } 
                </Typography>
                ))}
              </Box>
             
            </Box>

            <Container
              style={{
                width:'92%',
                maxWidth:'92%',
              
              }}
            >
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
                                  <span className="grid_content_list">{feature?.module_title}</span>
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
                              {item.annual > 0 &&
                              <Typography variant={'h3'} fontWeight={700}
                               className={'price_section_text'}
                              >
                                  <span className={'price_section_left'}> ${pricingOption === 'annual'
                                    ? item.annual
                                    : item.monthly}
                                    /</span> <span className={'price_section_type'}> {pricingOption === 'annual'
                                    ? 'Year'
                                    : 'Month' } 
                                  </span>
                              </Typography>
                              }
                              {item.annual < 1 &&
                                  <Link
                                    to={'/contact-page/'}
                                    style={{ textDecoration: 'none' }}
                                  >
                                    <Typography variant={'h3'} fontWeight={700}
                                      className={'price_contact_use'} >
                                      Contact Us
                                    </Typography>
                                  </Link>
                              }
                            </Box>
                            {item.annual > 0 &&

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
                             }
                            </CardActions>
                         
                        </Box>
                      <Box flexGrow={1} />
                        <CardActions
                          sx={{ justifyContent: 'flex-end', padding: 4 }}
                        >
                          {item.annual > 0 &&
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
                          }

                          {item.annual < 1 &&
                            
                            <Button 
                              size={'large'} 
                              variant={'contained'}
                              onClick={() => addToCart(item.id,item.product_id)}
                              className="addToOrder"
                              style={{
                                width: 'rgba(55, 125, 255, 0.1) !important'
                              }}
                              
                            >
                              <Link
                              to={'/contact-page/'}
                              style={{ textDecoration: 'none' }}
                            >
                                Contact Us
                                </Link>
                            </Button>
                         
                          }
                        </CardActions>
                      </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Container>
        <Container
          style={{
            background: 'rgb(247, 250, 255)',
            width:'90%',
            maxWidth:'90%',
            marginRight:'5px',
            borderRadius:'5px',
            padding:'50px 50px 20px 50px',
            margin:'0px auto 80px',
          }}
        >
           {unlimlimtedSubscriptions?.map((item, i) => (
            <Box>
            <Box marginBottom={4}>
              <Typography fontWeight={700} variant={'h4'} className={'ultimate_plane_title'}>
                {item?.title}
              </Typography>
              <Typography fontWeight={700} variant={'h6'} className={'content_ultimate'}>
                {item?.sub_title}
              </Typography>
              <Typography fontWeight={700} variant={'h4'}  className={'company_month'}>
                <span className={'price_per_month'}>${pricingOption === 'annual'
                                    ? item.annual
                                    : item.monthly}</span>/per Company/ {pricingOption === 'annual'
                                    ? 'Year'
                                    : 'Month' } 
              </Typography>
            </Box>
            <Box
              
            > 
              <Grid container spacing={1}
                style={{
                  background: '#fff',
                  padding:'30px 20px',
                }}
              >
                {mock.map((item, i) => (
                  <Grid item xs={12} md={3} key={i}>
                    {item.features.map((feature, j) => (
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
                              bgcolor={theme.palette.secondary.main}
                              width={20}
                              height={20}
                              className={'svg_color'}
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
                          <ListItemText primary={feature} className={'grid_content_list'}/>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid> 
            </Box>
            <Box flexGrow={1} >
              <CardActions
                sx={{ justifyContent: 'flex-end', padding: 4 }}
              >
                <Button 
                  size={'large'} 
                  variant={'contained'}
                
                  className="addToOrder"
                  style={{
                    width: 'rgba(55, 125, 255, 0.1) !important'
                  }}
                  
                >
                    Add To Order
                </Button>
              </CardActions>
            </Box>  
          </Box>
          ))}
        </Container>  
        <Box
          style={{
            width:'90%',
            margin:'20px auto'
          }}
      
        >
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Box
                style={{
                  background: 'rgb(247, 250, 255)',
                  width:'99%',
                  float:'left',
                  marginRight:'5px',
                  borderRadius:'5px',
                  padding:'50px',
                }}
              >
                <Typography
                  variant={'h6'}
                  fontWeight={700}
                  align={'center'}
                  gutterBottom
                  className={'product_service_title'}
                >
                  Integration Service?
                </Typography>
                <Typography align={'center'} className={'product_service_content'}>
                  Book a free call with the Shifti integration team.
                </Typography>
                <Box marginTop={2} display={'flex'} justifyContent={'center'}  className={'header_service_button'}>
                  <Button
                    size={'large'}
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
                    className={'product_service_button'}
                  >
                    Book A Call
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                borderLeft: {
                  xs: 'none',
              
                },
              }}
            >
              <Box
                style={{
                  background: 'rgb(247, 250, 255)',
                  width:'99%',
                  float:'right',
                  marginLeft:'5px',
                  borderRadius:'5px',
                  padding:'50px',
                }}
              >
                <Typography
                  variant={'h6'}
                  fontWeight={700}
                  align={'center'}
                  gutterBottom
                  className={'product_service_title'}
                >
                 Need Support?
                </Typography>
                <Typography align={'center'} className={'product_service_content'}>
                  Contact us through our email form or directly via email.
                </Typography>
                <Box marginTop={2} display={'flex'} justifyContent={'center'} className={'header_service_button'}>
                  <Button
                    size={'large'}
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

                    className={'product_service_button'}
                  >
                    Email Us
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Container
          style={{
            background: 'rgb(247, 250, 255)',
            width:'90%',
            maxWidth:'90%',
            marginRight:'5px',
            borderRadius:'5px',
            padding:'50px',
            margin:'80px auto',
          }}
        >
          <Box marginBottom={4}>
            <Typography fontWeight={700} variant={'h4'}
              className={'compare_title'}
            >
              Compare the options
            </Typography>
          </Box>
          <Box
            
          >
            <TableContainer component={Paper} elevation={0}
              style={{
                background: 'rgb(247, 250, 255)',
              }}
            >
              <Table aria-label="caption table" sx={{ minWidth: 600 }}>
                <caption>
                  <span className={'ultimate_copy_cell_bottom'}>
                    Compare the plans and choose the one which works for you the best.
                  </span>
                </caption>
                <TableHead>
                  <TableRow className={'tableRow'}>
                    <TableCell  >Features</TableCell>
                    {pricing.map((item, i) => (
                      <TableCell 
                        align="center" 
                        key={i}
                        className={'table_cell_ultimate'}
                      >
                        <Typography
                          sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
                          className={'compare_grid_title_left'}
                        >
                          {item.title}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {features.map((feature) => (
                    <TableRow key={feature.id} className={'compare_grid_content'}>
                      <TableCell 
                      component="th" 
                        scope="row"
                        className={'compare_grid_title'}
                      >
                        {feature.title}
                      </TableCell>
                      <TableCell align="center">
                        <Box display={'flex'} justifyContent={'center'}>
                          {pricing[0].features.indexOf(feature.id) !== -1 ? (
                            <Box
                              component={Avatar}
                              bgcolor={theme.palette.secondary.main}
                              width={20}
                              height={20}
                              className={'svg_color'}
                            >
                              <svg
                                width={12}
                                height={12}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={'svg_title'}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Box>
                          ) : (
                            ''
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box display={'flex'} justifyContent={'center'}>
                          {pricing[1].features.indexOf(feature.id) !== -1 ? (
                            <Box
                              component={Avatar}
                              bgcolor={theme.palette.secondary.main}
                              width={20}
                              height={20}
                              className={'svg_color'}
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
                          ) : (
                            ''
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box display={'flex'} justifyContent={'center'}>
                          {pricing[2].features.indexOf(feature.id) !== -1 ? (
                            <Box
                              component={Avatar}
                              bgcolor={theme.palette.secondary.main}
                              width={20}
                              height={20}
                              className={'svg_color'}
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
                          ) : (
                            ''
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box display={'flex'} justifyContent={'center'}>
                          {pricing[3].features.indexOf(feature.id) !== -1 ? (
                            <Box
                              component={Avatar}
                              bgcolor={theme.palette.secondary.main}
                              width={20}
                              height={20}
                              className={'svg_color'}
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
                          ) : (
                            ''
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box display={'flex'} justifyContent={'center'}>
                          {pricing[3].features.indexOf(feature.id) !== -1 ? (
                            <Box
                              component={Avatar}
                              bgcolor={theme.palette.secondary.main}
                              width={20}
                              height={20}
                              className={'svg_color'}
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
                          ) : (
                            ''
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell />
                    {pricing.map((item, i) => (
                      <TableCell align="center" key={i}>
                        {item.isButtonText ==true &&
                        <Button
                          size={'large'}
                          variant={item.isHighlighted ? 'contained' : 'outlined'}
                        > 

                          {item.btnText}
                        </Button>
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>  
        <Box
          style={{
            width:'100%',
            margin:'0 auto',
            background: 'rgb(247, 250, 255)',
            padding: '1px 0px',
          }}
        >
          <Box
            style={{
              width:'90%',
              margin:'50px auto',
              paddingBottom:'20px',
              background:'#fff',
              borderRadius:'5px'
            }}
          >
            <Box marginBottom={4}
              style={{
                background:'#377DFF',
                padding:'20px'
              }}
              className ={'faq_header'}
            >
              <Typography
                variant="h4"
                align={'left'}
                gutterBottom
                style={{
                  color:'#fff',
                  lineHeight: '130%',
                  fontSize:'30px',
                 
                }}
                className={'faq_header_title'}
                sx={{
                  fontWeight: 700,
                  color:'#fff',
                }}
              >
                
                Frequently Asked Questions
              </Typography>
              <Typography variant="h6" align={'left'} color={'text.secondary'}
                style={{
                  fontSize:'16px',
                  borderTopLeftRadius: '5px',
                  borderTopRightRadius: '5px',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
                className={'faq_header_content'}
              >
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </Typography>
            </Box>
            <Box>
              <Box marginBottom={6}
                
              >
                <FaqGroupItem
                  title={'Product'}
                  items={[
                    {
                      title: 'Can I purchase a gift certificate?',
                      subtitle:
                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                    },
                    {
                      title: 'What is your return policy?',
                      subtitle:
                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                    },
                    {
                      title: 'Do you sell gift cards?',
                      subtitle:
                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                    },
                    {
                      title: 'Can I change plans later on?',
                      subtitle:
                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                    },
                    {
                      title: 'Is this a subscription service?',
                      subtitle:
                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                    },
                  ]}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            width:'90%',
            margin:'60px auto',
            background: '#fff',
          }}
        > 
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              align={'center'}
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
              className={'product_blog_page_title'}
            >
              Supporting all businesses, no matter how big or small.
            </Typography>
            <Typography variant="h6" align={'center'} color={'text.secondary'} className={'product_blog_page_content'}>
            Need help? Got a question or query for us? Look here.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {blogList.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}  >
                <Box
                  component={'a'}
                  href={''}
                  display={'block'}
                  width={1}
                  height={1}
                  style={{
                    padding:'5px',
                    background: 'rgb(247, 250, 255)',
                  }}
                  sx={{
                    textDecoration: 'none',
                    background: 'rgb(247, 250, 255)',
                    transition: 'all .2s ease-in-out',
                    '&:hover': {
                      transform: `translateY(-${theme.spacing(1 / 2)})`,
                    },
                  }}
                  className={'blog_area'}
                >
                  <Box
                    component={Card}
                    width={1}
                    height={1}
                    borderRadius={2}
                    display={'flex'}
                    flexDirection={'column'}
                    style={{
                      padding:'5px',
                      background: '#F8F9FC',
                      borderRadius:'5px'
                    }}
                    className={'blog_area_int'}
                  >
                    <CardMedia
                      image={item.image}
                      sx={{
                        height: 200,
                      }}
                      className={'blog_area_media'}
                    />
                    <Box 
                      component={CardContent}
                      className={'blog_header_area'}
                    >
                      
                      <Typography
                        align={'left'}
                        variant={'body2'}
                        color="textSecondary"
                        className={'blog_header'}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Box component={CardContent}>
                      
                      <Typography
                        align={'left'}
                        variant={'body2'}
                        color="textSecondary"
                        className={'blog_descraption'}
                      >
                        {item.short_dsc}
                      </Typography>
                    </Box>
                    <Box flexGrow={1} />
                    <Box component={CardActions} justifyContent={'flex-start'}>
                      <Link
                        to={`/blog/${item?.slug}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          size="large"
                          endIcon={
                            <svg
                              width={16}
                              height={16}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          }
                        >
                          Learn more
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Main>
    </>
  );
};

export default SingleSubscriptionProduct;
