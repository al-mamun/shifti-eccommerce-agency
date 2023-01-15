/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { api } from 'api/config';
import Main from '../../layouts/Main';
import Container from 'components/Container';
import { Billing, Orders, Shipping } from './components';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useContext } from 'react';
import { CartData } from 'context/CartContext';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan, Province of China',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];

const Checkout = (): JSX.Element => {
  const theme = useTheme();
  const { cartData, orderSummary, CardData, setCardData, userData } =
    useContext(CartData);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(null);

  ReactSession.setStoreType('sessionStorage');

  const authData = useCallback(() => {
    const authUser = ReactSession.get('userData');
    return authUser;
  }, []);

  useEffect(() => {
    setAuthUser(authData());
    console.log(authUser);
  }, [authData]);

  const calculateTotal = (price, quantity) => {
    const p = price.split('৳')[1];
    const total = parseInt(p) * parseFloat(quantity);

    return total;
  };

  const onSubmit = (data) => {
    console.log(data);

    // setCardData(data);
    fetch(`${api}/api/place-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData?.token} `,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.id) {
          navigate('/order-complete');
        }
        // setCardData(data);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Main>
        <Container>
          <Box>
            <Grid container spacing={{ xs: 4, md: 8 }}>
              <Grid item xs={12} md={7}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Box>
                      <Grid container spacing={{ xs: 2, md: 4 }}>
                        <Grid item xs={12}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Enter your full name
                          </Typography>
                          <TextField
                            label="Full name *"
                            variant="outlined"
                            name={'fullName'}
                            {...register('fullName', { required: true })}
                            fullWidth
                          />
                          {errors.fullName &&
                            errors.fullName.type === 'required' && (
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This is required
                              </Alert>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Country
                          </Typography>
                          <Autocomplete
                            options={countries}
                            autoHighlight
                            // @ts-ignore
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                <img
                                  loading="lazy"
                                  width="20"
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  alt=""
                                />
                                {option.label} ({option.code}) +{option.phone}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Choose a country"
                                name={'country'}
                                {...register('country', { required: true })}
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                          {errors.country &&
                            errors.country.type === 'required' && (
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This is required
                              </Alert>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Zip Code
                          </Typography>
                          <TextField
                            label="Zip Code *"
                            variant="outlined"
                            name={'zip_code'}
                            {...register('zip_code', { required: true })}
                            fullWidth
                          />
                          {errors.zip_code &&
                            errors.zip_code.type === 'required' && (
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This is required
                              </Alert>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            City
                          </Typography>
                          <TextField
                            label="City *"
                            variant="outlined"
                            name={'city'}
                            {...register('city', { required: true })}
                            fullWidth
                          />
                          {errors.city && errors.city.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Enter your address
                          </Typography>
                          <TextField
                            label="Address *"
                            variant="outlined"
                            name={'address'}
                            {...register('address', { required: true })}
                            fullWidth
                          />
                          {errors.address &&
                            errors.address.type === 'required' && (
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This is required
                              </Alert>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            variant={'subtitle2'}
                            sx={{ marginBottom: 2 }}
                            fontWeight={700}
                          >
                            Enter your email
                          </Typography>
                          <TextField
                            label="Email *"
                            variant="outlined"
                            name={'email'}
                            {...register('email', { required: true })}
                            fullWidth
                          />
                          {errors.email && errors.email.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item xs={12}>
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked={true}
                                  color="primary"
                                />
                              }
                              label="Billing address is the same as shipping address"
                            />
                          </Box>
                          <Box>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  defaultChecked={true}
                                  color="primary"
                                />
                              }
                              label="Save this information for the next time"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={700} marginBottom={4}>
                      Payment information
                    </Typography>
                    <Billing />
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="h6" fontWeight={700} marginBottom={4}>
                  Order summary
                </Typography>
                <Card
                  variant={'outlined'}
                  sx={{
                    padding: { xs: 2, sm: 4 },
                  }}
                >
                  {/* <Orders /> */}

                  <Box>
                    {cartData.map((item, i) => (
                      <Box key={i}>
                        <Box display={'flex'}>
                          <Box
                            component={'img'}
                            src={item?.product?.feature_photo}
                            alt={item?.product?.product_name}
                            sx={{
                              borderRadius: 2,
                              width: 100,
                              height: 100,
                              maxWidth: 120,
                              marginRight: 2,
                              filter:
                                theme.palette.mode === 'dark'
                                  ? 'brightness(0.7)'
                                  : 'none',
                            }}
                          />
                          <Box
                            display={'flex'}
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            justifyContent={'space-between'}
                            alignItems={'flex-start'}
                            width={1}
                          >
                            <Box>
                              <Typography
                                fontWeight={700}
                                variant={'subtitle2'}
                              >
                                {item?.product?.product_name?.slice(0, 20)} ...
                              </Typography>
                              {/* <Typography color={'text.secondary'} variant={'subtitle2'}>
                  Size: {item.size}
                </Typography> */}
                              {/* <Typography
                  color={'text.secondary'}
                  variant={'subtitle2'}
                  noWrap={true}
                >
                  Code: {item.code}
                </Typography> */}
                            </Box>
                            <Box>
                              {/* <Typography fontWeight={700} variant={'subtitle2'}>
                  {item.price}
                </Typography> */}

                              <Box fontWeight={700} marginLeft={2}>
                                <h4 style={{ display: 'flex' }}>
                                  <span>$</span>
                                  {calculateTotal(
                                    item?.product?.price,
                                    item?.quantity,
                                  )}
                                </h4>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Divider
                          sx={{
                            marginY: { xs: 2, sm: 4 },
                            // display: i === mock.length - 1 ? 'none' : 'block',
                          }}
                        />
                      </Box>
                    ))}
                    <Box
                      component={'form'}
                      noValidate
                      autoComplete="off"
                      sx={{
                        marginY: 4,
                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                          bgcolor: 'background.paper',
                        },
                      }}
                    >
                      <Box display="flex">
                        <Box
                          flex={'1 1 auto'}
                          component={TextField}
                          label="Discount code"
                          variant="outlined"
                          color="primary"
                          fullWidth
                          height={54}
                          maxWidth={300}
                        />
                        <Box
                          component={Button}
                          variant="contained"
                          color="primary"
                          size="large"
                          height={54}
                          marginLeft={1}
                          width={1}
                          flex={1}
                        >
                          Apply
                        </Box>
                      </Box>
                    </Box>
                    <Stack spacing={2} marginY={{ xs: 2, sm: 4 }}>
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography color={'text.secondary'}>
                          Subtotal
                        </Typography>
                        <Typography color={'text.secondary'} fontWeight={700}>
                          $ {orderSummary?.subTotal}
                        </Typography>
                      </Box>
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography color={'text.secondary'}>
                          Quantity
                        </Typography>
                        <Typography color={'text.secondary'} fontWeight={700}>
                          {orderSummary?.quantity}
                        </Typography>
                      </Box>
                      {/* <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'}>VAT (+20%)</Typography>
          <Typography color={'text.secondary'} fontWeight={700}>
            $35,94
          </Typography>
        </Box> */}
                      <Divider />
                      <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant={'h6'} fontWeight={700}>
                          Order total
                        </Typography>
                        <Typography variant={'h6'} fontWeight={700}>
                          $ {orderSummary?.totalAmount}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* start Billing */}

                  <Box>
                    <Typography variant="h6" fontWeight={700} marginBottom={4}>
                      Payment information
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 4 }}>
                      <Grid item xs={12}>
                        <Typography
                          variant={'subtitle2'}
                          sx={{ marginBottom: 2 }}
                          fontWeight={700}
                        >
                          Enter your card number
                        </Typography>
                        <TextField
                          label="Card number *"
                          variant="outlined"
                          name={'cardNumber'}
                          {...register('cardNumber', { required: true })}
                          fullWidth
                          required
                        />
                        {errors.cardNumber &&
                          errors.cardNumber.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant={'subtitle2'}
                          sx={{ marginBottom: 2 }}
                          fontWeight={700}
                        >
                          Name on the card
                        </Typography>
                        <TextField
                          label="Name *"
                          variant="outlined"
                          name={'cardName'}
                          {...register('cardName', { required: true })}
                          fullWidth
                        />
                        {errors.cardName &&
                          errors.cardName.type === 'required' && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                              This is required
                            </Alert>
                          )}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          variant={'subtitle2'}
                          sx={{ marginBottom: 2 }}
                          fontWeight={700}
                        >
                          Month
                        </Typography>
                        <TextField
                          label="Month *"
                          variant="outlined"
                          name={'month'}
                          {...register('month', { required: true })}
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Typography
                          variant={'subtitle2'}
                          sx={{ marginBottom: 2 }}
                          fontWeight={700}
                        >
                          Zip Code
                        </Typography>
                        <TextField
                          label="Zip code *"
                          variant="outlined"
                          name={'zip_code'}
                          fullWidth
                          required
                        />
                        {errors.month && errors.month.type === 'required' && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            This is required
                          </Alert>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          variant={'subtitle2'}
                          sx={{ marginBottom: 2 }}
                          fontWeight={700}
                        >
                          Year
                        </Typography>
                        <TextField
                          label="year *"
                          variant="outlined"
                          name={'year'}
                          {...register('year', { required: true })}
                          fullWidth
                          required
                        />
                        {errors.year && errors.year.type === 'required' && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            This is required
                          </Alert>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          variant={'subtitle2'}
                          sx={{ marginBottom: 2 }}
                          fontWeight={700}
                          
                        >
                          CVV
                        </Typography>
                        <TextField
                          label="Card CVV *"
                          variant="outlined"
                          name={'cvv'}
                          {...register('cvv', { required: true })}
                          fullWidth
                          required
                        />
                        {errors.cvv && errors.cvv.type === 'required' && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            This is required
                          </Alert>
                        )}
                      </Grid>
                    </Grid>

                    <Button
                      sx={{ mt: 3 }}
                      type={'submit'}
                      variant={'contained'}
                      size={'large'}
                      fullWidth
                    >
                      Place an order
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      marginRight: { xs: -2, sm: -4 },
                      marginLeft: { xs: -2, sm: -4 },
                      marginBottom: { xs: -2, sm: -4 },
                      padding: { xs: 2, sm: 4 },
                      bgcolor: 'alternate.main',
                    }}
                  >
                    <Stack direction={'row'} spacing={2}>
                      <Button
                        sx={{
                          color: 'text.secondary',
                        }}
                        startIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        }
                      >
                        Contact sales
                      </Button>
                      <Button
                        sx={{
                          color: 'text.secondary',
                        }}
                        startIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        }
                      >
                        Email us
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Main>
    </form>
  );
};

export default Checkout;
