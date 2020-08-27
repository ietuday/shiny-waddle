"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jwt = require('jsonwebtoken');
const Utility_1 = __importDefault(require("../../controller/_helper/Utility"));
const UserBusiness = require("../../app/business/user/UserBusiness");
class ValidateUser {
}
/**
 * @function auth
 * @description middleware which checks is token is present in headers or not
 */
ValidateUser.auth = (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1];
        const options = { expiresIn: '1d', issuer: 'techverito' };
        try {
            console.log(process.env.JWT_SECRET);
            console.log(req.headers.authorization);
            jwt.verify(token, process.env.JWT_SECRET, options, (error, result) => {
                console.log(error);
                if (error) {
                    return res.send(Utility_1.default.generateResponse(401, error, false, null));
                }
                let userBusiness = new UserBusiness();
                userBusiness.findByToken(token, (error, result) => {
                    if (error) {
                        return res.send(Utility_1.default.generateResponse(401, error, false, null));
                    }
                    if (result) {
                        req.user = result;
                        console.log(req);
                        next();
                    }
                    else {
                        return res.send(Utility_1.default.generateResponse(401, "Token expired", false, null));
                    }
                });
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    else {
        res.status(401).send(Utility_1.default.generateResponse(401, "Authentication Error : Token required", false, null));
    }
};
Object.seal(ValidateUser);
module.exports = ValidateUser;
//# sourceMappingURL=ValidateUser.js.map