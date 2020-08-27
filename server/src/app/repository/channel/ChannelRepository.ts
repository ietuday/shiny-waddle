import mongoose = require("mongoose");

import RepositoryBase = require('../base');
import IChannelModel = require('../../model/interfaces/ChannelModel');
import ChannelSchema = require('../../dataAccess/schemas/ChannelSchema');

class ChannelRepository extends RepositoryBase<IChannelModel>{
    constructor() {
        super(ChannelSchema);
    }


}
Object.seal(ChannelRepository);
export = ChannelRepository;
    