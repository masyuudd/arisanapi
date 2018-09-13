'use strict';

module.exports = function(app) {
  const todoList = require('../controller/users');

  app.route('/').get(todoList.index);

  // get all users
  // app.route('/api/users').get(todoList.users);
  app.route('/api/users').get(todoList.users);

  // get user by id
  app.route('/api/user/:id').get(todoList.findById);

  // add new user
  app.route('/api/user').post(todoList.add);

  // update user
  app.route('/api/user/:id').put(todoList.update);

  // delete user
  app.route('/api/user/:id').delete(todoList.delete);

  app.route('/api/posts').post(authenticate, todoList.postTest);

  function authenticate(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;

      next();
    }else{
      res.sendStatus(403);
    }

  }
}
