"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Swagger Options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Admin API',
            version: '1.0.0',
            description: 'Admin API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:5003',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Point to the TypeScript route files
};
// Serve Swagger UI
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
/**
 * Function to setup Swagger in the app
 * @param app Express application instance
 */
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    console.log('Swagger documentation is available at http://localhost:5003/api-docs');
};
exports.setupSwagger = setupSwagger;
