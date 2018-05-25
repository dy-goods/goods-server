const path = require('path');
module.exports = {
  isDev: true,
  feDebug: true,
  graphqlUri: 'http://127.0.0.1:9090/graphql',
  db: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../test.sqlite'),
  },
};
