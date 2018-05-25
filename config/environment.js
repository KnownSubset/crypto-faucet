'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'crypto-faucet',
    environment,
    rootURL: '/',
    locationType: 'none',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com",
      'style-src': "'self' 'unsafe-inline'",
      'img-src': "'self' data:",
    },
     firebase: {
        apiKey: "AIzaSyBS8_kud8A2iZ69y9uqRVCOZr96ZUHSzyc",
        authDomain: "crypto-e1d66.firebaseapp.com",
        databaseURL: "https://crypto-e1d66.firebaseio.com",
        projectId: "crypto-e1d66",
        storageBucket: "",
        messagingSenderId: "917234560583"
     },
    fontawesome: {
      icons: {
        'pro-light-svg-icons': 'all',
        'pro-solid-svg-icons': 'all',
        'pro-regular-svg-icons': 'all',
        'fontawesome-pro-solid': 'all',
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
