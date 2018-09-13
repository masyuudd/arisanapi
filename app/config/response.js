'use strict';

exports.ok = function(data, res) {
  var data = {
      'status': 200,
      'data': data
  };
  res.json(data);
  res.end();
};
