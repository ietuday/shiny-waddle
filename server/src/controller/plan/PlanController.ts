import express = require('express');


import IBaseController = require('../interfaces/base');
import PlanBusiness = require('../../app/business/plan/PlanBusiness')
import IPlanModel = require('../../app/model/interfaces/PlanModel');
import { IResponseFormat } from '../interfaces/common/ResponseFormat';
import Utility from '../_helper/Utility';

class PlanController implements IBaseController<PlanBusiness>{
    private _responseFormat: IResponseFormat;

    /**
     * @function create
     * @description Creating a Plan
     * @param request 
     * @param response 
     * @author Udayaditya Singh
     */
    create(request: express.Request, response: express.Response): void {
        try {
            const Plan: IPlanModel = <IPlanModel>request.body;
            const planBusiness = new PlanBusiness();
            planBusiness.create(Plan, (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, `Plan Created Successfully`, true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }


  /**
   * @function update
   * @description Update a Plan By Id
   * @param request 
   * @param response 
   * @author Udayaditya Singh
   */
    update(request: express.Request, response: express.Response): void {
        try {
            const {id, item} = request.body;
            const planBusiness = new PlanBusiness();
            planBusiness.update(id,item, (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, 'Update Plan', true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }

    /**
     * @function retrieve
     * @description retrieve all the Plans
     * @param request 
     * @param response 
     * @author Udayaditya Singh
     */
    retrieve(request: express.Request, response: express.Response): void {
        try {
            const planBusiness = new PlanBusiness();
            planBusiness.retrieve( (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, 'Retrieve Plan', true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }

    /**
     * @function delete
     * @description Delete a Plan by Id
     * @param request 
     * @param response 
     */
    delete(request: express.Request, response: express.Response): void {
        try {
            const planBusiness = new PlanBusiness();
            const {id} = request.body
            planBusiness.delete(id, (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, 'Delete Plan', true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }

    /**
     * @function findById
     * @description Find Plan By Id
     * @param request 
     * @param response 
     */
    findById(request: express.Request, response: express.Response): void { 
        try {
            const planBusiness = new PlanBusiness();
            const {id} = request.body
            planBusiness.findById(id, (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, 'Find Plan by Id', true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }
}
export = PlanController;