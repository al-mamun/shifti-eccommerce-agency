import React, { useState, useEffect, useCallback, useContext } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import product from '../../../../../Products';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { api } from 'api/config';
import { Link } from 'react-router-dom';

const FilterCategory = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const [genders, setGenders] = useState([]);

  const handleClick = (): void => {
    setOpen(!open);
  };
  


  const handleCheckboxChange = (item) => {
    const newGenders = genders;
    const index = newGenders.indexOf(item);
    index === -1 ? newGenders.push(item) : newGenders.splice(index, 1);
    setGenders(newGenders);
    const post = [
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img56.jpg',
        title: 'Adidas shoes',
        description: 'Discover the new collection of Adidas.',
        price: '$69.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 5,
        reviewCount: 12,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img63.jpg',
        title: 'Colorful shoes',
        description: 'Colorful shoes designed for everyone.',
        price: '$39.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 4,
        reviewCount: 6,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img57.jpg',
        title: 'Nike',
        description: 'New arrivals of Nike sport shoes.',
        price: '$49.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 5,
        reviewCount: 8,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img58.jpg',
        title: 'Sneakers',
        description: 'Trendy Sneakers designed for everyone.',
        price: '$59.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 4,
        reviewCount: 10,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img56.jpg',
        title: 'Adidas shoes',
        description: 'Discover the new collection of Adidas.',
        price: '$69.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 5,
        reviewCount: 12,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img63.jpg',
        title: 'Colorful shoes',
        description: 'Colorful shoes designed for everyone.',
        price: '$39.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 4,
        reviewCount: 6,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img57.jpg',
        title: 'Nike',
        description: 'New arrivals of Nike sport shoes.',
        price: '$49.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 5,
        reviewCount: 8,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img58.jpg',
        title: 'Sneakers',
        description: 'Trendy Sneakers designed for everyone.',
        price: '$59.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 4,
        reviewCount: 10,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img56.jpg',
        title: 'Adidas shoes',
        description: 'Discover the new collection of Adidas.',
        price: '$69.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 5,
        reviewCount: 12,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img63.jpg',
        title: 'Colorful shoes',
        description: 'Colorful shoes designed for everyone.',
        price: '$39.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 4,
        reviewCount: 6,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img57.jpg',
        title: 'Nike',
        description: 'New arrivals of Nike sport shoes.',
        price: '$49.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 5,
        reviewCount: 8,
      },
      {
        media: 'https://assets.maccarianagency.com/backgrounds/img58.jpg',
        title: 'Sneakers',
        description: 'Trendy Sneakers designed for everyone.',
        price: '$59.90',
        href: '/demos/ecommerce/product-overview',
        reviewScore: 4,
        reviewCount: 10,
      },
    ];
   
  };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${api}/api/frontend/get-categories?limit=10&is_active=1`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        sx={{ cursor: 'pointer' }}
        marginBottom={1}
        onClick={() => handleClick()}
      >
        <Typography fontWeight={700}>Categories</Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack spacing={1}>
          {posts.map((item) => (
            <Box key={item}>
              <FormControlLabel
                sx={{ marginLeft: 0 }}
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked={genders.indexOf(item.slug) >= 0}
                    onChange={() => handleCheckboxChange(item.slug)}
                    sx={{
                      padding: 0,
                      marginRight: 1,
                    }}
                  />
                }
                label={item.category_name}
              />
            </Box>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

export default FilterCategory;
