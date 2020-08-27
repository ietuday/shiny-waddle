"use strict";
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../../middleware/swaggerSpec");
const UserRoutes = require("../user/UserRoutes");
const PlanRoutes = require("../plan/PlanRoutes");
const ChannelRoutes = require("../channel/ChannelRoutes");
var app = express();
const apiVersion = "/api/v1";
class BaseRoutes {
    get routes() {
        app.use(`${apiVersion}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        app.use(`${apiVersion}/user`, new UserRoutes().routes);
        app.use(`${apiVersion}/plan`, new PlanRoutes().routes);
        app.use(`${apiVersion}/channel`, new ChannelRoutes().routes);
        return app;
    }
}
module.exports = BaseRoutes;
//# sourceMappingURL=index.js.map