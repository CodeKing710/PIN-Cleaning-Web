//Add route controllers here
exports.main = {path: '/', ctrl: require("./main")};
exports.profile = {path: '/profile', ctrl: require('./profile')};
exports.service = {path: '/services', ctrl: require('./service')};
exports.login = {path: '/login', ctrl: require('./login')};
exports.cart = {path: '/cart', ctrl: require('./cart')};
exports.payments = {path: '/pay', ctrl: require('./payment')};
exports.invoice = {path: '/invoicing', ctrl: require('./invoicing')};