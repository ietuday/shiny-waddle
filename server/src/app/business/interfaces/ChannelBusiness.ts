import BaseBusiness = require('./base');
import IChannelModel = require('./../../model/interfaces/ChannelModel');

interface ChannelBusiness extends BaseBusiness<IChannelModel> {

}
export = ChannelBusiness;