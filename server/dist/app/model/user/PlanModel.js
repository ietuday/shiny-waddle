"use strict";
class PlanModel {
    constructor(planModel) {
        this.planModel = planModel;
        this._planModel = planModel;
    }
    get _id() {
        return this._planModel._id;
    }
    get name() {
        return this._planModel.name;
    }
    get createdAt() {
        return this._planModel.createdAt;
    }
    get updatedAt() {
        return this._planModel.updatedAt;
    }
}
Object.seal(PlanModel);
module.exports = PlanModel;
//# sourceMappingURL=PlanModel.js.map