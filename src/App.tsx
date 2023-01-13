/* eslint-disable semi */
/* eslint-disable quotes */
import { BrowserRouter } from 'react-router-dom';
import Page from './components/Page';
import Routes from './Routes';

import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CartContext from 'context/CartContext';

export const routerBasename = '/shifti';

const App = (): JSX.Element => {
  return (
    <Page>
      {/* router base for server subdirectory */}
      <CartContext>
        <BrowserRouter basename={routerBasename}>
          <Routes />
        </BrowserRouter>
      </CartContext>
    </Page>
  );
};

export default App;
