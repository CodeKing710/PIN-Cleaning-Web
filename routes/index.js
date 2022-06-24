//Add route controllers here
exports.main = {path: '/', ctrl: require("./main")};
exports.service = {path: '/services', ctrl: require('./services')};
exports.cart = {path: '/cart', ctrl: require('./cart')};
// exports.auth = {path: '/auth', ctrl: require('./auth')};
