"use strict";
const RepositoryBase = require("../base");
const ChannelSchema = require("../../dataAccess/schemas/ChannelSchema");
class ChannelRepository extends RepositoryBase {
    constructor() {
        super(ChannelSchema);
    }
}
Object.seal(ChannelRepository);
module.exports = ChannelRepository;
//# sourceMappingURL=ChannelRepository.js.map