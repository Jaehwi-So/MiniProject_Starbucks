/**
 * @swagger
 * tags:
 *   name: Tokens
 *   description: SMS 인증 API
 * definitions:
 *   ResponseModel:
 *     type: object
 *     required:
 *       - success
 *       - message
 *     properties:
 *       success:
 *         type: boolean
 *         description: 성공여부
 *         example: true
 *       message:
 *         type: string
 *         description: 메시지
 *         example: 성공하였습니다.
 * 
 * @swagger
 *  paths:
 *    /tokens/phone:
 *      post:
 *        tags:
 *        - "Tokens"
 *        summary: "SMS 인증 토큰 요청하기"
 *        description: ""
 *        consumes:
 *          - "application/json"
 *        requestBody:
 *          x-name: body
 *          required: true
 *          content:
 *              application/json: 
 *                  schema:
 *                      properties: 
 *                        phone:
 *                          type: string
 *                          example: 01012345678
 *                          description: 휴대폰번호
 *        responses:
 *          200:
 *            description: "결과"
 *            content: 
 *              application/json:
 *                  schema:
 *                      $ref: "#/definitions/ResponseModel"
 * @swagger
 *  paths:
 *    /tokens/phone:
 *      put:
 *        tags:
 *        - "Tokens"
 *        summary: "SMS 인증 토큰 인증하기"
 *        description: ""
 *        consumes:
 *          - "application/json"
 *        requestBody:
 *          x-name: body
 *          required: true
 *          content:
 *              application/json: 
 *                  schema:
 *                      properties: 
 *                        phone:
 *                          type: string
 *                          example: 01012345678
 *                          description: 휴대폰번호
 *                        token:
 *                          type: string
 *                          example: 123456
 *                          description: 토큰번호
 *        responses:
 *          200:
 *            description: "결과"
 *            content: 
 *              application/json:
 *                  schema:
 *                      $ref: "#/definitions/ResponseModel"
 */



