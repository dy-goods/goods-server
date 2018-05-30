const path = require('path');
module.exports = {
  port: 9090,
  isDev: false,
  isProd: false,
  isMock: true,
  feDebug: true,
  root: path.resolve(__dirname, '..'),
  webpack: {
    port: 9091,
  },
  onlineHost: '//www.53zi.com',
  graphqlUri: '//www.53zi.com/graphql',
};
