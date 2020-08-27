const jwt = require('jsonwebtoken');

import Utility from '../../controller/_helper/Utility';
import UserBusiness = require('../../app/business/user/UserBusiness');

class ValidateUser {

    /**
     * @function auth
     * @description middleware which checks is token is present in headers or not
     */
    static auth = (req, res, next) => {
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
                        return res.send(Utility.generateResponse(401, error, false, null));
                    }
                    let userBusiness = new UserBusiness();
                    userBusiness.findByToken(token, (error, result) => {
                        if (error) {
                            return res.send(Utility.generateResponse(401, error, false, null));
                        }
                        if (result) {
                            req.user = result;
                            console.log(req);
                            
                            next();
                        } else {
                            return res.send(Utility.generateResponse(401, "Token expired", false, null));
                        }
                    })
                });

            } catch (error) {
                throw new Error(error);
            }
        } else {
            res.status(401).send(Utility.generateResponse(401, "Authentication Error : Token required", false, null));
        }
    }
}

Object.seal(ValidateUser);
export = ValidateUser;