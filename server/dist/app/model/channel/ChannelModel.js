"use strict";
class ChannelModel {
    constructor(channelModel) {
        this.channelModel = channelModel;
        this._channelModel = channelModel;
    }
    get _id() {
        return this._channelModel._id;
    }
    get name() {
        return this._channelModel.name;
    }
    get price() {
        return this._channelModel.price;
    }
    get plans() {
        return this._channelModel.plans;
    }
    get createdAt() {
        return this._channelModel.createdAt;
    }
    get updatedAt() {
        return this._channelModel.updatedAt;
    }
}
Object.seal(ChannelModel);
module.exports = ChannelModel;
//# sourceMappingURL=ChannelModel.js.map