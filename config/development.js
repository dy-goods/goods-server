const path = require('path');
module.exports = {
  isDev: true,
  feDebug: true,
  graphqlUri: `http://${require('ip').address()}:9090/graphql`,
  db: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../test.sqlite'),
  },
};
