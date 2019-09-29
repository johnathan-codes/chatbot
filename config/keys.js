if (process.env.NODE_ENV === 'PRODUCTION') {
  module.exports = require('./prod');
} else {
  //FIXME:
  module.exports = require('./dev');
  //module.exports = require('./prod');
}
