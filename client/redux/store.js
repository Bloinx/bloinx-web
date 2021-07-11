import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/rootReducer';

const middleware = [thunk];

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const makeStore = () => createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
);

export default createWrapper(makeStore);
