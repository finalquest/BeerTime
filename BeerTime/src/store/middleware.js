import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger({});

// eslint-disable-next-line
const devMiddleware = __DEV__ ? [logger] : [];


export default applyMiddleware(
  ...devMiddleware,
);
