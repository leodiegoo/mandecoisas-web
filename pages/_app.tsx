import { useEffect } from 'react';
import ReactGA from 'react-ga';
import ThemeContainer from '../contexts/theme/ThemeContainer';

import './styles.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize('G-SPWKMK749S');
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.set({ page: window.location.pathname + window.location.search });
  });
  return (
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
  );
}

export default MyApp;
