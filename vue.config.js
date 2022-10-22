import publicPath from '../WeBitcoin/public'

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/We.bitcoin/" : "/",
  };
  