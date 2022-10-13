//Add route controllers here
exports.main = {path: '/', ctrl: require("./main")};
exports.service = {path: '/services', ctrl: require('./service')};
exports.login = {path: '/login', ctrl: require('./login')};
exports.cart = {path: '/cart', ctrl: require('./cart')};
exports.payments = {path: '/pay', ctrl: require('./payment')};