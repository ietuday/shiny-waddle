import express = require('express');

import UserController = require('../../../controller/user/UserController');
import ValidateUser = require('../../middleware/ValidateUser');

const router = express.Router();

class UserRoutes {
    private _UserController: UserController;

    constructor() {
        this._UserController = new UserController();
    } 

    get routes() {
        const controller = this._UserController;
         /**
         * @swagger
         * /api/v1/user/create:
         *   post:
         *     tags:
         *       - User
         *     summary: create a User
         *     description: create password for satTv
         *     parameters:
         *       - name: user
         *         description: user data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       201:
         *         description: User created successfully
         *       404:
         *         description: error
         */
        router.post("/create", controller.create);
         /**
         * @swagger
         * /api/v1/user/retieve:
         *   get:
         *     tags:
         *       - User
         *     summary: Retieve User
         *     description: Retieve All Users
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: All Users
         *       404:
         *         description: error
         */
        router.get("/retieve", controller.retrieve);

         /**
         * @swagger
         * /api/v1/user/find-by-id:
         *   post:
         *     tags:
         *       - User
         *     summary: Find User
         *     description: Find a user by id
         *     parameters:
         *       - name: user
         *         description: user data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: User Detail
         *       404:
         *         description: error
         */
        router.post("/find-by-id", controller.findById);

        /**
         * @swagger
         * /api/v1/user/update-by-id:
         *   put:
         *     tags:
         *       - User
         *     summary: Update User
         *     description: update a user by id
         *     parameters:
         *       - name: user
         *         description: user data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: User updated successfully
         *       404:
         *         description: error
         */
        router.put("/update-by-id", controller.update);

          /**
         * @swagger
         * /api/v1/user/delete-by-id:
         *   delete:
         *     tags:
         *       - User
         *     summary: Delete User
         *     description: Delete a user by id
         *     parameters:
         *       - name: user
         *         description: user data object
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: User deleted successfully
         *       404:
         *         description: error
         */
        router.delete("/delete-by-id", controller.delete);

         /**
         * @swagger
         * /api/v1/user/login:
         *   post:
         *     tags:
         *       - User
         *     summary: login a User
         *     description: create password for satTv
         *     parameters:
         *       - name: user
         *         description: Email And Password
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Login  successfully
         *       404:
         *         description: error
         */
        router.post("/login", controller.login);
         /**
         * @swagger
         * /api/v1/user/logged-in-user:
         *   get:
         *     tags: 
         *       - User
         *     summary: logged in user
         *     description: returns a logged in user data
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: logged in user
         *       404:
         *         description: error 
         */
        router.get("/logged-in-user", ValidateUser.auth, controller.loggedInUser);
          /**
         * @swagger
         * /api/v1/user/add-money:
         *   post:
         *     tags:
         *       - User
         *     summary: Add Money
         *     description: Add money to user account
         *     parameters:
         *       - name: Amount
         *         description: amount you want to add
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Money added  successfully
         *       404:
         *         description: error
         */
        router.post('/add-money', controller.addMoney) 

          /**
         * @swagger
         * /api/v1/user/logout:
         *   get:
         *     tags:
         *       - User
         *     summary: Logout
         *     description: logout the existing user(Authenticated)
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Logout successfully
         *       404:
         *         description: error
         */
        router.get('/logout', ValidateUser.auth, controller.logout)

        /**
         * @swagger
         * /api/v1/user/add-plan-by-user:
         *   post:
         *     tags:
         *       - User
         *     summary: Add Plan
         *     description: Add Plan to the user
         *     parameters:
         *       - name: Plan Detail
         *         description: UserId and Plan ID
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Plan Added successfully
         *       404:
         *         description: error
         */
        router.post('/add-plan-by-user', ValidateUser.auth, controller.addPlanByUser)


        /**
         * @swagger
         * /api/v1/user/add-channel-by-user:
         *   post:
         *     tags:
         *       - User
         *     summary: Add Channel
         *     description: Add Channel to the user
         *     parameters:
         *       - name: Channel Detail
         *         description: UserId and Channel ID
         *         in:  body
         *         required: true
         *         type: string
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Channel Added successfully
         *       404:
         *         description: error
         */
        router.post('/add-channel-by-user', ValidateUser.auth, controller.addChannelByUser)
        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;