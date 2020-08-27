import IChannelModel = require('../interfaces/ChannelModel');

class ChannelModel {
    private _channelModel: IChannelModel;

    constructor(private channelModel: IChannelModel) {
        this._channelModel = channelModel;
    }

    get _id(): string {
        return this._channelModel._id;
    }

    get name(): String {
        return this._channelModel.name;
    }

    get price(): Number {
        return this._channelModel.price;
    }

    get plans(): Array<String> {
        return this._channelModel.plans;
    }

    get createdAt(): Date {
        return this._channelModel.createdAt;
    }

    get updatedAt(): Date {
        return this._channelModel.updatedAt;
    }

}

Object.seal(ChannelModel);
export = ChannelModel;