import IUserModel = require('../interfaces/UserModel');

class UserModel {
    private _userModel: IUserModel;

    constructor(private userModel: IUserModel) {
        this._userModel = userModel;
    }

    get _id(): string {
        return this._userModel._id;
    }

    get firstName(): string {
        return this._userModel.firstName;
    }

    get lastName(): string {
        return this._userModel.lastName;
    }

    get email(): string {
        return this._userModel.email;
    }
    
    get password(): string {
        return this._userModel.password;
    }

    get token(): string {
        return this._userModel.token;
    }

    get salt(): string {
        return this._userModel.salt;
    }

    get channels(): string {
        return this._userModel.salt;
    }

 

    get createdAt(): Date {
        return this._userModel.createdAt;
    }

    get updatedAt(): Date {
        return this._userModel.updatedAt;
    }

    get isVerified(): Boolean {
        return this._userModel.isVerified;
    }

    get isAdmin(): Boolean {
        return this._userModel.isAdmin;
    }

    get plans(): Array<any> {
        return this._userModel.plans;
    }

    get balance(): Number {
        return this._userModel.balance;
    }

}

Object.seal(UserModel);
export = UserModel;