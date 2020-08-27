import mongoose = require("mongoose");

import RepositoryBase = require('../base');
import IPlanModel = require('../../model/interfaces/PlanModel');
import PlanSchema = require('../../dataAccess/schemas/PlanSchema');

class PlanRepository extends RepositoryBase<IPlanModel>{
    constructor() {
        super(PlanSchema);
    }


}
Object.seal(PlanRepository);
export = PlanRepository;
    