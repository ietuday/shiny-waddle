import IPlanModel = require('../interfaces/PlanModel');

class PlanModel {
    private _planModel: IPlanModel;

    constructor(private planModel: IPlanModel) {
        this._planModel = planModel;
    }

    get _id(): string {
        return this._planModel._id;
    }

    get name(): String {
        return this._planModel.name;
    }

    get createdAt(): Date {
        return this._planModel.createdAt;
    }

    get updatedAt(): Date {
        return this._planModel.updatedAt;
    }

}

Object.seal(PlanModel);
export = PlanModel;