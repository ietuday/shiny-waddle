"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const UserBusiness = require("../../app/business/user/UserBusiness");
const Utility_1 = __importDefault(require("../_helper/Utility"));
class UserController {
    /**
     * @function create
     * @description Creating a User
     * @param request
     * @param response
     * @author Udayaditya Singh
     */
    create(request, response) {
        try {
            const user = request.body;
            const userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, `A verification email has been sent to ${user.email}.`, true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function update
     * @description Update a User By Id
     * @param request
     * @param response
     * @author Udayaditya Singh
     */
    update(request, response) {
        try {
            const { id, item } = request.body;
            const userBusiness = new UserBusiness();
            userBusiness.update(id, item, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Update User', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function retrieve
     * @description retrieve all the users
     * @param request
     * @param response
     * @author Udayaditya Singh
     */
    retrieve(request, response) {
        try {
            const userBusiness = new UserBusiness();
            userBusiness.retrieve((error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Retrieve User', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function delete
     * @description Delete a User by Id
     * @param request
     * @param response
     */
    delete(request, response) {
        try {
            const userBusiness = new UserBusiness();
            const { id } = request.body;
            userBusiness.delete(id, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Delete User', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function findById
     * @description Find User By Id
     * @param request
     * @param response
     */
    findById(request, response) {
        try {
            const userBusiness = new UserBusiness();
            const { id } = request.body;
            userBusiness.findById(id, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Find User by Id', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function login
     * @description login a user by email and password
     * @param request
     * @param response
     * @author Udayaditya Singh
     */
    login(request, response) {
        try {
            const userBusiness = new UserBusiness();
            const { email, password } = request.body;
            userBusiness.login(email, password, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'LoggedIn Successfully', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function loggedInUser
     * @description Get logged In User Detail(required Authentication)
     * @param request
     * @param response
     * @author Udayaditya Singh
     */
    loggedInUser(request, response) {
        try {
            const userBusiness = new UserBusiness();
            response.status(200).send(Utility_1.default.generateResponse(200, 'Logged In User', true, userBusiness.getUserDetails(request['user'])));
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    addMoney(request, response) {
        try {
            const userBusiness = new UserBusiness();
            const { amount } = request.body;
            const userId = request['user']['_id'];
            userBusiness.addMoney(amount, userId, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Money Added', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     *
     * @param request
     * @param response
     */
    logout(request, response) {
        try {
            const userBusiness = new UserBusiness();
            const userId = request['user']['_id'];
            userBusiness.logout(userId, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Logged Out Successfully', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    addPlanByUser(request, response) {
        try {
            const userBusiness = new UserBusiness();
            const { userId, planId } = request.body;
            userBusiness.addPlanByUser(userId, planId, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Plan Added', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    addChannelByUser(request, response) {
        try {
            const userBusiness = new UserBusiness();
            const { userId, channelId } = request.body;
            userBusiness.addChannelByUser(userId, channelId, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Channel Added', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
}
module.exports = UserController;
//# sourceMappingURL=UserController.js.map