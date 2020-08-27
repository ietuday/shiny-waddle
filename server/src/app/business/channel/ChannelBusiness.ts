import crypto = require('crypto');
import async = require('async');
import jwt = require('jsonwebtoken');

import ChannelRepository = require('../../repository/channel/ChannelRepository');
import IChannelBusiness = require('../interfaces/ChannelBusiness');
import IChannelModel = require('../../model/interfaces/ChannelModel');

class ChannelBusiness implements IChannelBusiness {
    private _ChannelRepository: ChannelRepository;

    saltLength: number = parseInt(process.env.SALT_LENGTH);

    constructor() {
        this._ChannelRepository = new ChannelRepository();
    }

    /**
     * @function create
     * @description Create a Channel
     * @param Channel 
     * @param callback 
     * @author Udayaditya Singh
     */
    create(Channel: IChannelModel, callback: (error: any, result: any) => void) {
        Channel.createdAt = new Date();
        this._ChannelRepository.create(Channel, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

    /**
     * @function retrieve
     * @description Retrieve all Channels
     * @param callback 
     * @author Udayaditya Singh
     */
    retrieve(callback: (error: any, result: any) => void) {
        this._ChannelRepository.retrieve((err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

    /**
     * @function delete a Channel
     * @description Delete a Channel
     * @param _id 
     * @param callback 
     * @author Udayaditya Singh
     */
    delete(_id:string, callback: (error: any, result: any) => void) {
        this._ChannelRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
     }

    /**
     * @function update
     * @description Update a Channel
     * @param _id 
     * @param item 
     * @param callback 
     * @author Udayaditya Singh
     */
    update(_id: string, item: IChannelModel, callback: (error: any, result: any) => void) {
        this._ChannelRepository.update(_id,item, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
    }

    /**
     * @function findById
     * @description find Channel by id
     * @param id 
     * @param callback 
     * @author Udayaditya Singh
     */
    findById(_id:string, callback: (error: any, result: any) => void) { 
        this._ChannelRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        })
    }
   
}

Object.seal(ChannelBusiness);
export = ChannelBusiness;
