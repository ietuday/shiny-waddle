"use strict";
const swaggerJSDoc = require("swagger-jsdoc");
let options = {
    swaggerDefinition: {
        info: {
            title: "SatTv API DOCS",
            version: "3.0.0",
        }
    },
    produces: ["application/json"],
    schemes: ["http", "https"],
    apis: ["**/*.ts"],
    basePath: "/api/v1" // Base path (optional)
};
let swaggerSpec = swaggerJSDoc(options);
swaggerSpec.security = [
    {
        Bearer: []
    }
];
swaggerSpec.securityDefinitions = {
    Bearer: {
        name: "Authorization",
        in: "header",
        type: "apiKey",
        description: "Please prefix your JWT token with the word Bearer (and a space)."
    }
};
Object.seal(swaggerSpec);
module.exports = swaggerSpec;
//# sourceMappingURL=swaggerSpec.js.map