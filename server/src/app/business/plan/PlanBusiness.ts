import PlanRepository = require('../../repository/plan/PlanRepository');
import IPlanBusiness = require('../interfaces/PlanBusiness');
import IPlanModel = require('../../model/interfaces/PlanModel');

class PlanBusiness implements IPlanBusiness {
    private _PlanRepository: PlanRepository;

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
    create(Plan: IPlanModel, callback: (error: any, result: any) => void) {
        Plan.createdAt = new Date();
        this._PlanRepository.create(Plan, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

    /**
     * @function retrieve
     * @description Retrieve all Plans
     * @param callback 
     * @author Udayaditya Singh
     */
    retrieve(callback: (error: any, result: any) => void) {
        this._PlanRepository.retrieve((err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

    /**
     * @function delete a Plan
     * @description Delete a Plan
     * @param _id 
     * @param callback 
     * @author Udayaditya Singh
     */
    delete(_id:string, callback: (error: any, result: any) => void) {
        this._PlanRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
     }

    /**
     * @function update
     * @description Update a Plan
     * @param _id 
     * @param item 
     * @param callback 
     * @author Udayaditya Singh
     */
    update(_id: string, item: IPlanModel, callback: (error: any, result: any) => void) {
        this._PlanRepository.update(_id,item, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
    }

    /**
     * @function findById
     * @description find Plan by id
     * @param id 
     * @param callback 
     * @author Udayaditya Singh
     */
    findById(_id:string, callback: (error: any, result: any) => void) { 
        this._PlanRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
    }
   
}

Object.seal(PlanBusiness);
export = PlanBusiness;
