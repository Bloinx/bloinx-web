import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import drizzleOptions from '../../Drizzle/drizzleOptions';

const drizzle = new Drizzle(drizzleOptions);

function App({ Component, pageProps }) {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {
          (drizzleContext) => {
            const { drizzleState, initialized } = drizzleContext;
            if (!initialized) {
              return 'Loading...';
            }
            return (
              <Component {...pageProps} drizzle={drizzle} drizzleState={drizzleState} />
            );
          }
        }
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
