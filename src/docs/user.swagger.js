/**
 * @swagger
 * /api/v1/user/register:
 *  post:
 *    summary: Register a new user
 *    description: This API is used to register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *              - email
 *            properties:
 *              username:
 *                type: string
 *                description: The username of the user
 *              password:
 *                type: string
 *                description: The password of the user
 *              email:
 *                type: string
 *                description: The email of the user
 *    responses:
 *      201:
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *                token:
 *                  type: string
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/login:
 *  post:
 *    summary: User login
 *    description: This API is used for user login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                description: The username of the user
 *              password:
 *                type: string
 *                description: The password of the user
 *    responses:
 *      200:
 *        description: User logged in successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *      400:
 *        description: Invalid username or password
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/profile:
 *  get:
 *    summary: Get user profile
 *    description: This API is used to get the profile of the logged-in user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: User profile fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */
