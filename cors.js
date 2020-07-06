'use strict';

const {
  DEPLOYMENT,
  CORS
} = require('./config/constants');

/**
 * CORS controller which controls the cross domain access
 */

module.exports.allowCrossDomain = (req, res, next) => {
  const whitelist = [];
  if (DEPLOYMENT.ENVIRONMENT === CORS.DEV_ENVIRONMENT) {
    whitelist = CORS.ALLOWED_DEV_DOMAINS;
  } else if (DEPLOYMENT.ENVIRONMENT === CORS.QA_ENVIRONMENT) {
    whitelist = CORS.ALLOWED_QA_DOMAINS;
  }
  return {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
};
