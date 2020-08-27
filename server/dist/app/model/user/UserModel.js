"use strict";
class UserModel {
    constructor(userModel) {
        this.userModel = userModel;
        this._userModel = userModel;
    }
    get _id() {
        return this._userModel._id;
    }
    get firstName() {
        return this._userModel.firstName;
    }
    get lastName() {
        return this._userModel.lastName;
    }
    get email() {
        return this._userModel.email;
    }
    get password() {
        return this._userModel.password;
    }
    get token() {
        return this._userModel.token;
    }
    get salt() {
        return this._userModel.salt;
    }
    get channels() {
        return this._userModel.salt;
    }
    get createdAt() {
        return this._userModel.createdAt;
    }
    get updatedAt() {
        return this._userModel.updatedAt;
    }
    get isVerified() {
        return this._userModel.isVerified;
    }
    get isAdmin() {
        return this._userModel.isAdmin;
    }
    get plans() {
        return this._userModel.plans;
    }
    get balance() {
        return this._userModel.balance;
    }
}
Object.seal(UserModel);
module.exports = UserModel;
//# sourceMappingURL=UserModel.js.map