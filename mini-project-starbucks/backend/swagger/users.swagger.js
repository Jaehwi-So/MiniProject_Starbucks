/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 API
 * definitions:
 *   UserModel:
 *     type: object
 *     required:
 *       - og
 *       - _id
 *       - name
 *       - email
 *       - personal
 *       - pwd
 *       - prefer
 *       - phone
 *       - __v
 *     properties:
 *       og:
 *          type: object
 *          required:
 *            - title
 *            - description
 *            - image
 *          properties:
 *            title:
 *              type: string
 *              description: 제목
 *              example: 네이버
 *            description:
 *              type: string
 *              description: 설명
 *              example: 네이버 입니다
 *            image:
 *              type: string
 *              description: 이미지
 *              example: https://src
 *       _id:
 *         type: string
 *         description: 인덱스
 *         example: 63d5b630ea6d7ed5b2f92a35
 *       name:
 *         type: string
 *         description: 이름
 *         example: 재휘
 *       email:
 *         type: string
 *         description: 이메일
 *         example: sjh9708@gmail.com
 *       personal:
 *         type: string
 *         description: 주민번호
 *         example: 970805-1111111
 *       pwd:
 *         type: string
 *         description: 비밀번호
 *         example: 1234
 *       prefer:
 *         type: string
 *         description: 선호 사이트
 *         example: https://www.naver.com
 *       phone:
 *         type: string
 *         description: 휴대폰번호
 *         example: 01011111111
 *       __v:
 *         type: int
 *         description: v
 *         example: 0
 *   UserRequestModel:
 *     type: object
 *     required:
 *       - name
 *       - email
 *       - personal
 *       - pwd
 *       - prefer
 *       - phone
 *     properties:
 *       name:
 *         type: string
 *         description: 이름
 *         example: 재휘
 *       email:
 *         type: string
 *         description: 이메일
 *         example: sjh9708@gmail.com
 *       personal:
 *         type: string
 *         description: 주민번호
 *         example: 970805-1111111
 *       pwd:
 *         type: string
 *         description: 비밀번호
 *         example: 1234
 *       prefer:
 *         type: string
 *         description: 선호 사이트
 *         example: https://www.naver.com
 *       phone:
 *         type: string
 *         description: 휴대폰번호
 *         example: 01011111111
 *   UserResponseModel:
 *     type: object
 *     required:
 *       - success
 *       - message
 *       - data
 *     properties:
 *       success:
 *         type: boolean
 *         description: 성공여부
 *         example: true
 *       data:
 *         type: array
 *         items: 
 *              $ref: "#/definitions/UserModel"
 *       message:
 *         type: string
 *         description: 메시지
 *         example: 성공하였습니다.
 *   InsertUserResponseModel:
 *     type: object
 *     required:
 *       - success
 *       - message
 *       - data
 *     properties:
 *       success:
 *         type: boolean
 *         description: 성공여부
 *         example: true
 *       data:
 *         type: string
 *         description: ID
 *         example: dwqsqw12e3wssq
 *       message:
 *         type: string
 *         description: 메시지
 *         example: 성공하였습니다.
 * 
 * @swagger
 * /user:
 *   get:
 *     summary: 유저 리스트 가져오기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 조회 결과
 *         content: 
 *           application/json:
 *              schema: 
 *                  $ref: "#/definitions/UserResponseModel"
 * 
* @swagger
 *  paths:
 *    /user:
 *      post:
 *        tags:
 *        - "Users"
 *        summary: "유저 등록하기"
 *        description: ""
 *        consumes:
 *          - "application/json"
 *        requestBody:
 *          x-name: body
 *          required: true
 *          content:
 *              application/json: 
 *                  schema:
 *                      $ref: "#/definitions/UserRequestModel" 
 *        responses:
 *          200:
 *            description: "결과"
 *            content: 
 *              application/json:
 *                  schema:
 *                      $ref: "#/definitions/ResponseModel"
 */
