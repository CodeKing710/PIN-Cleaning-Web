module.exports = function() {
  return function(req,req,next) {
    if(!req.session.userid) {
      req.session.userid = 'guest';
    }
    next();
  }
}