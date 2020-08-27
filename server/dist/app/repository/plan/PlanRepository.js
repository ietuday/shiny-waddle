"use strict";
const RepositoryBase = require("../base");
const PlanSchema = require("../../dataAccess/schemas/PlanSchema");
class PlanRepository extends RepositoryBase {
    constructor() {
        super(PlanSchema);
    }
}
Object.seal(PlanRepository);
module.exports = PlanRepository;
//# sourceMappingURL=PlanRepository.js.map