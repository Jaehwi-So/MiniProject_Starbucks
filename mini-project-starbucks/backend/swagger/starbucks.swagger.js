/**
 * @swagger
 * tags:
 *   name: Starbucks
 *   description: 스타벅스 메뉴 API
 * definitions:
 *   StarbucksModel:
 *     type: object
 *     required:
 *       - _id
 *       - name
 *       - img
 *       - __v
 *     properties:
 *       _id:
 *         type: string
 *         description: 인덱스
 *         example: 63d5b630ea6d7ed5b2f92a35
 *       name:
 *         type: string
 *         description: 메뉴명
 *         example: 아메리카노
 *       title:
 *         type: string
 *         description: 이미지
 *         example: https://src
 *       __v:
 *         type: int
 *         description: v
 *         example: 0
 *   StarbucksResponseModel:
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
 *              $ref: "#/definitions/StarbucksModel"
 *       message:
 *         type: string
 *         description: 메시지
 *         example: 성공하였습니다.
 * 
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 스타벅스 메뉴 가져오기
 *     tags: [Starbucks]
 *     responses:
 *       200:
 *         description: 조회 결과
 *         content: 
 *           application/json:
 *              schema: 
 *                  $ref: "#/definitions/StarbucksResponseModel"
 * 
 */


