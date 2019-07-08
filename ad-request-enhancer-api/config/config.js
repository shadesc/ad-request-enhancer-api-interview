/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2018
 * Author: Chadi Cortbaoui
 */
// Util to fill process env variable based on environment level
// for the purpose of this app, only DEV and test are used.
const env = (process.env.NODE_ENV || 'DEV').trim();

console.log('CURRENT ENV',env)

// Set up DEV and TESTING environments.
if(env === 'DEV' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}