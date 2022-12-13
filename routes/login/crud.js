const view = require('express').Router();
const {User} = require('../../models');

view.get('/:id', async (req,res) => {
  if(req.params.id == req.session.userid) {
    const userRO = global.cache.ROs.filter((RO) => {
      if(RO.username == req.params.id) {
        return RO;
      }
    });
    
    try {
      const user = await User.findOne({username: req.session.userid});
      res.render('login/view', {user: user, ROs: userRO});
    } catch (e) {console.log(e);}
  } else {
    res.render('404', {msg: "Why are you trying to access things that aren't yours?"});
  }
});

view.get('/:id/edit', async (req,res) => {
  if(req.params.id == req.session.userid) {
    try {
      const user = await User.findOne({username: req.session.userid});
      res.render('login/edit', {user: user});
    } catch (e) {console.log(e);}
  } else {
    res.render('404', {msg: "Why are you trying to access things that aren't yours?"});
  }
});

view.put('/:id/edit', async (req,res) => {
  if(req.params.id == req.session.userid) {
    try {
      const user = await User.findOneAndUpdate({username: req.session.userid},{
        ...req.body
      });
      res.redirect(`/login/${req.params.id}`);
    } catch (e) {console.log(e);}
  } else {
    res.render('404', {msg: "Why are you trying to access things that aren't yours?"});
  }
});

view.delete('/:id/delete', async (req,res) => {
  if(req.params.id == req.session.userid) {
    try {
      const user = await User.findOneAndRemove({username: req.session.userid});
      global.cache.ROS = global.caches.ROs.filter((RO) => {
        if(RO.username !== req.session.userid) {
          return RO;
        }
      });
      res.render('login/d-suc');
    } catch (e) {
      console.log(e);
      res.render('login/d-fail');
    }
  } else {
    res.render('404', {msg: "Why are you trying to access things that aren't yours?"});
  }
});

module.exports = view;