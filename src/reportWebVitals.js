import {
  getLCP,
  getFID,
  getCLS,
  getFCP,
  getTTFB,
} from 'web-vitals/base';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // reporter.then(({
    //   getCLS, getFID, getFCP, getLCP, getTTFB,
    // }) => {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
    // });
  }
};

export default reportWebVitals;
