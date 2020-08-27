"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ChannelBusiness = require("../../app/business/channel/ChannelBusiness");
const Utility_1 = __importDefault(require("../_helper/Utility"));
class ChannelController {
    /**
     * @function create
     * @description Creating a Channel
     * @param request
     * @param response
     * @author Udayaditya Singh
     */
    create(request, response) {
        try {
            const Channel = request.body;
            const channelBusiness = new ChannelBusiness();
            channelBusiness.create(Channel, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, `Channel Created Successfully`, true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function update
     * @description Update a Channel By Id
     * @param request
     * @param response
     * @author Udayaditya Singh
     */
    update(request, response) {
        try {
            const { id, item } = request.body;
            const channelBusiness = new ChannelBusiness();
            channelBusiness.update(id, item, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Update Channel', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function retrieve
     * @description retrieve all the Channels
     * @param request
     * @param response
     * @author Udayaditya Singh
     */
    retrieve(request, response) {
        try {
            const channelBusiness = new ChannelBusiness();
            channelBusiness.retrieve((error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Retrieve Channel', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function delete
     * @description Delete a Channel by Id
     * @param request
     * @param response
     */
    delete(request, response) {
        try {
            const channelBusiness = new ChannelBusiness();
            const { id } = request.body;
            channelBusiness.delete(id, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Delete Channel', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
    /**
     * @function findById
     * @description Find Channel By Id
     * @param request
     * @param response
     */
    findById(request, response) {
        try {
            const channelBusiness = new ChannelBusiness();
            const { id } = request.body;
            channelBusiness.findById(id, (error, result) => {
                error
                    ?
                        response.status(500).send(Utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(Utility_1.default.generateResponse(200, 'Find Channel by Id', true, result));
            });
        }
        catch (error) {
            response.status(500).send(Utility_1.default.generateResponse(404, error, false, null));
        }
    }
}
module.exports = ChannelController;
//# sourceMappingURL=ChannelController.js.map