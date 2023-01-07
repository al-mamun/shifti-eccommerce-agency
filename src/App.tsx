import { BrowserRouter } from 'react-router-dom';
import Page from './components/Page';
import Routes from './Routes';

import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export const routerBasename = '/shifti';

const App = (): JSX.Element => {
  return (
    <Page>
      {/* router base for server subdirectory */}
      <BrowserRouter basename={routerBasename}>
        <Routes />
      </BrowserRouter>
    </Page>
  );
};

export default App;
