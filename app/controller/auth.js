'use strict';

const response  = require('../config/response');
const db        = require('../config/database');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
var token;


exports.login = function(req, res) {
  var result = {
    "status": true,
    "message": "",
    "data": []
  };
  const { username, password } = req.body

  let sql = `SELECT * FROM users WHERE username= '${username}'`;
  db.query(sql, username, function (error, rows, fields){
    if(error){
      res.status(400).send({ error: "Error occured!"});
    }else{
      if (rows.length > 0) {
        const passCheck = bcrypt.compareSync(password, rows[0].password);
        if (passCheck) {
          result.status = false;
          result['message'] = "Email and Password match!";
          
          var User = {
            userid: rows[0].userid,
            username: rows[0].username,
            firstname: rows[0].firstname,
            lastname: rows[0].lastname,
            email: rows[0].email,
            created: rows[0].created,
            updated: rows[0].updated
          }
          result['data'] = User;
          let token = jwt.sign(User, process.env.SECRET_KEY);
          result['token'] = token;
        } else {
          result.status = false;
          result['message'] = "Email and Password does not match!";
        }
      } else {
        result.status = false;
        result['message'] = "Email does not exists!";
      }
      res.status(200).json(result);
    }
  });
};