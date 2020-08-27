"use strict";
const PlanRepository = require("../../repository/plan/PlanRepository");
class PlanBusiness {
    constructor() {
        this._PlanRepository = new PlanRepository();
    }
    /**
     * @function create
     * @description Create a Plan
     * @param Plan
     * @param callback
     * @author Udayaditya Singh
     */
    create(Plan, callback) {
        Plan.createdAt = new Date();
        this._PlanRepository.create(Plan, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function retrieve
     * @description Retrieve all Plans
     * @param callback
     * @author Udayaditya Singh
     */
    retrieve(callback) {
        this._PlanRepository.retrieve((err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function delete a Plan
     * @description Delete a Plan
     * @param _id
     * @param callback
     * @author Udayaditya Singh
     */
    delete(_id, callback) {
        this._PlanRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function update
     * @description Update a Plan
     * @param _id
     * @param item
     * @param callback
     * @author Udayaditya Singh
     */
    update(_id, item, callback) {
        this._PlanRepository.update(_id, item, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function findById
     * @description find Plan by id
     * @param id
     * @param callback
     * @author Udayaditya Singh
     */
    findById(_id, callback) {
        this._PlanRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
}
Object.seal(PlanBusiness);
module.exports = PlanBusiness;
//# sourceMappingURL=PlanBusiness.js.map