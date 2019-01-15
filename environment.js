'use strict';

const path = require('path');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: path.resolve(__dirname, `.${process.env.NODE_ENV}.env`)
});

const requiredEnvironmentVariables = [
  'DATABASE_URL',
];

requiredEnvironmentVariables.forEach(environmentVariable => {
  const value = process.env[environmentVariable];
  if (!value) {
    throw new Error(`missing enviroment variable ${environmentVariable}`);
  }
});

