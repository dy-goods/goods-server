const path = require('path');
module.exports = {
  isProd: true,
  isDev: false,
  onlineAddress: '',
  db: {
    name: 'goods',
    user: 'root',
    password: '683004',
    options: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
    },
  },
};
