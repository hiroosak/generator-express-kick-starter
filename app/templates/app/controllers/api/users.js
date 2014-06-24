"use strict";

var _ = require('lodash');

/**
 * @swagger
 * resourcePath: /api/1
 * description: User API
 */

/**
 * @swagger
 * path: /api/1/users/me
 * operations:
 *   - httpMethod: GET
 *     summary: ログインユーザー情報の取得
 *     notes:
 *     responseClass: User
 *     nickname: Login
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: 'authorization'
 *         description: 'Bearer [token]'
 *         type: string
 *         paramType: header
 *         required: true
 *         dataType: string
 *         allowMultiple: false
 *         defaultValue: 'Bearer [token]'
 *     responseMessages:
 *       - code: 200
 *         message: ok
 *         responseModel: User
 */
exports.me = function(req, res) {
  var data = _.omit(req.user, "accessToken", "refreshToken", "type", "iat", "exp");
  res.json(data);
};

/**
 * @swagger
 * path: /api/1/users/{userId}
 * operations:
 *   - httpMethod: GET
 *     summary: userId のユーザー情報
 *     notes:
 *     responseClass: User
 *     nickname: UserShow
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: 'userId'
 *         description: 'user id'
 *         type: Number 
 *         paramType: path
 *         required: true
 *         dataType: string
 *         allowMultiple: false
 *     responseMessages:
 *       - code: 200
 *         message: ok
 *         responseModel: User
 */
exports.show = function(req, res) {
  res.json(req.services.user);
};

/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       name:
 *         type: String
 *       createdAt:
 *         type: Date
 *       updatedAt:
 *         type: Date
 */
