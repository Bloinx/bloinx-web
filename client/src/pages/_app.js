import { useEffect } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import drizzleOptions from '../../Drizzle/drizzleOptions';
import theme from '../Toolkit/theme';

const drizzle = new Drizzle(drizzleOptions);

function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <ThemeProvider theme={theme}>
        <DrizzleContext.Consumer>
          {
            (drizzleContext) => {
              const { drizzleState, initialized } = drizzleContext;
              if (initialized) {
                return 'Loading...';
              }
              return (
                <>
                  <Component {...pageProps} drizzle={drizzle} drizzleState={drizzleState} />
                  <CssBaseline />
                </>
              );
            }
          }
        </DrizzleContext.Consumer>
      </ThemeProvider>
    </DrizzleContext.Provider>
  );
}

export default App;
