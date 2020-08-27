"use strict";
const ChannelRepository = require("../../repository/channel/ChannelRepository");
class ChannelBusiness {
    constructor() {
        this.saltLength = parseInt(process.env.SALT_LENGTH);
        this._ChannelRepository = new ChannelRepository();
    }
    /**
     * @function create
     * @description Create a Channel
     * @param Channel
     * @param callback
     * @author Udayaditya Singh
     */
    create(Channel, callback) {
        Channel.createdAt = new Date();
        this._ChannelRepository.create(Channel, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function retrieve
     * @description Retrieve all Channels
     * @param callback
     * @author Udayaditya Singh
     */
    retrieve(callback) {
        this._ChannelRepository.retrieve((err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function delete a Channel
     * @description Delete a Channel
     * @param _id
     * @param callback
     * @author Udayaditya Singh
     */
    delete(_id, callback) {
        this._ChannelRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function update
     * @description Update a Channel
     * @param _id
     * @param item
     * @param callback
     * @author Udayaditya Singh
     */
    update(_id, item, callback) {
        this._ChannelRepository.update(_id, item, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    /**
     * @function findById
     * @description find Channel by id
     * @param id
     * @param callback
     * @author Udayaditya Singh
     */
    findById(_id, callback) {
        this._ChannelRepository.delete(_id, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
}
Object.seal(ChannelBusiness);
module.exports = ChannelBusiness;
//# sourceMappingURL=ChannelBusiness.js.map