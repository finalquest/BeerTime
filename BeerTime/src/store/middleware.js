import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import navigation from '../middlewares/navigation';


const logger = createLogger({});

// eslint-disable-next-line
const devMiddleware = __DEV__ ? [logger] : [];


export default applyMiddleware(
  ...devMiddleware,
  navigation,
  ReduxThunk,
);
