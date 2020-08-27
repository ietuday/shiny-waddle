import express = require('express');


import IBaseController = require('../interfaces/base');
import ChannelBusiness = require('../../app/business/channel/ChannelBusiness')
import IChannelModel = require('../../app/model/interfaces/ChannelModel');
import { IResponseFormat } from '../interfaces/common/ResponseFormat';
import Utility from '../_helper/Utility';

class ChannelController implements IBaseController<ChannelBusiness>{
    private _responseFormat: IResponseFormat;

    /**
     * @function create
     * @description Creating a Channel
     * @param request 
     * @param response 
     * @author Udayaditya Singh
     */
    create(request: express.Request, response: express.Response): void {
        try {
            const Channel: IChannelModel = <IChannelModel>request.body;
            const channelBusiness = new ChannelBusiness();
            channelBusiness.create(Channel, (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, `Channel Created Successfully`, true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }


  /**
   * @function update
   * @description Update a Channel By Id
   * @param request 
   * @param response 
   * @author Udayaditya Singh
   */
    update(request: express.Request, response: express.Response): void {
        try {
            const {id, item} = request.body;
            const channelBusiness = new ChannelBusiness();
            channelBusiness.update(id,item, (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, 'Update Channel', true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }

    /**
     * @function retrieve
     * @description retrieve all the Channels
     * @param request 
     * @param response 
     * @author Udayaditya Singh
     */
    retrieve(request: express.Request, response: express.Response): void {
        try {
            const channelBusiness = new ChannelBusiness();
            channelBusiness.retrieve( (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, 'Retrieve Channel', true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }

    /**
     * @function delete
     * @description Delete a Channel by Id
     * @param request 
     * @param response 
     */
    delete(request: express.Request, response: express.Response): void {
        try {
            const channelBusiness = new ChannelBusiness();
            const {id} = request.body
            channelBusiness.delete(id, (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, 'Delete Channel', true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }

    /**
     * @function findById
     * @description Find Channel By Id
     * @param request 
     * @param response 
     */
    findById(request: express.Request, response: express.Response): void { 
        try {
            const channelBusiness = new ChannelBusiness();
            const {id} = request.body
            channelBusiness.findById(id, (error, result) => {
            error 
                ?
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
            
                :

                    response.status(200).send(Utility.generateResponse(200, 'Find Channel by Id', true, result));
                
            })
        } catch (error) {
            response.status(500).send(Utility.generateResponse(404, error, false, null))
        }
    }

  
}
export = ChannelController;