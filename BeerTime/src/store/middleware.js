import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import navigation from '../middlewares/navigation';
import ApiFetch from '../middlewares/api';


const logger = createLogger({});

// eslint-disable-next-line
const devMiddleware = __DEV__ ? [logger] : [];


export default applyMiddleware(
  ...devMiddleware,
  navigation,
  ApiFetch,
);
