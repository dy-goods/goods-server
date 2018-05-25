const path = require('path');
module.exports = {
  isDev: true,
  feDebug: true,
  db: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../test.sqlite'),
  },
};
