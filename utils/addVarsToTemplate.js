module.exports = function (vars) {
  return function (req, res, next) {
    if(typeof vars === 'object') {
      req.app.locals = { ...(req.app.locals), ...vars}
    }
    req.app.locals.userid = req.session?.userid ?? 'guest';
    next();
  };
};
