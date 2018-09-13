'use strict';

const response  = require('../config/response');
const db        = require('../config/database');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');

// get all user
exports.users = function(req, res) {
  let sql = 'SELECT * FROM users';
  db.query(sql, function (error, rows, fields){
    if(error){
      console.log(error);
    }else{
      response.ok(rows, res);
    }
  });
};

// get user by id
exports.findById = function(req, res) {
  const id  = req.params.id;
  let sql   = 'SELECT * FROM users WHERE userid=?'
  const query = db.query(sql, id, function (error, rows, fields){
    if(error){
      console.log(error);
    }else{
      console.log(rows);
      if(!rows[0]) res.status(404).send('The user with the given ID was not found.');
      res.send(rows[0]);
    }
  });
};

// create new user
exports.add = function(req, res){
  var today = new Date();
  const { username, password } = req.body;
  const saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hashPass = bcrypt.hashSync(password, salt);

  var appData = {
    "error": 1,
    "data": ""
  };
  
  var data = {
    "username": req.body.username,
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
    "email": req.body.email,
    "password": hashPass,
    "created": today
  }

  

  let sql = 'INSERT INTO users SET?';
  db.query(sql, data, function(error, result) {
    if(error){
      console.log(error);
    }else{
      response.ok("User registered successfully!", res);
    }
  });
};

exports.update = function(req, res){
  var today = new Date();
  const id = req.params.id;
  const body = req.body;
  
  const data = [ 
    body.username, 
    body.firstname, 
    body.lastname,
    body.email,
    body.password,
    today, 
    id 
  ];
  
  let sql1 = 'SELECT * FROM users WHERE userid=?';
  db.query(sql1, id, function (error, rows, fields){
    if (error) {
      console.log(error);
    }else{
      if(!rows[0]) {
        res.status(404).send('The user with the given ID was not found.');
      }else{
        let sql2 = 'UPDATE `users` SET `username`=?, `firstname`=?, `lastname`=?, `email`=?,`password`=?,`updated`=? where `userid`=?';
        db.query(sql2, data, function (error, result, fields) {
          if(error){
            console.log(error);
          }else{
            response.ok("Data successfully updated.", res);
          }
        });
      }
    }

  });
};

exports.delete = function(req, res){
  const id = req.params.id;
  let sql1 = 'SELECT * FROM users WHERE userid=?';
  db.query(sql1, id, function (error, rows, fields){
    if (error) {
      console.log(error);
    }else{
      if(!rows[0]) {
        res.status(404).send('The user with the given ID was not found.');
      }else{
        let sql2 = 'DELETE FROM `users` WHERE `userid`=?';
        db.query(sql2, [id], function (error, result, fields) {
          if (error) throw error;
          response.ok('Data has been deleted', res);
        });
      }
    }

  });
};

exports.postTest = function(req, res){
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) =>{
    if(err){
      res.sendStatus(401);
    }else{
      res.json({
        message: 'Post created',
        data: authData
      });    
    }
  });
}
exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};
