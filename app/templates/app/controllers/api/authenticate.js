"use strict";
/**
 * @swagger
 * resourcePath: /api/1/authenticate
 * description: Authenticate API
 */

var jwt = require('jsonwebtoken')
var config = require('config')
var _ = require('lodash');

/**
 * @swagger
 * path: /api/1/authenticate
 * operations:
 *   - httpMethod: POST
 *     summary: Test
 *     notes:
 *     responseClass: [User]
 *     nickname: Login
 *     consumes:
 *       - application/json
 *     parameters:
 *     responseMessages:
 *       - code: 200
 *         message: ok
 *         responseModel: Token
 */
exports.index = function(req, res, next) {
  if (!req.user) {
    return next(new Error("But Authentication data"));
  }
  var payload = _.assign(req.user, {type: 'token'});
  res.json({
    token: jwt.sign(payload, config.jwt.options.secret, {expiresInMinutes: 60 * 60 * 24 * 30})
  });
};

/**
 * @swagger
 * models:
 *   Token:
 *     id: Token
 *     properties:
 *       token:
 *         type: String
 *         description: json_web_token
 */
