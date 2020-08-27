import BaseBusiness = require('./base');
import IPlanModel = require('./../../model/interfaces/PlanModel');

interface PlanBusiness extends BaseBusiness<IPlanModel> {

}
export = PlanBusiness;