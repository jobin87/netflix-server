"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const swaggerdoc_1 = require("./swagger/swaggerdoc");
const contentRouter_1 = __importDefault(require("./routes/contentRouter"));
dotenv_1.default.config(); // Load environment variables
(0, db_1.default)(); // Connect to MongoDB
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, swaggerdoc_1.setupSwagger)(app);
// Routes
app.use('/api/v1/auth', authRoutes_1.default);
app.use('/api/v1', contentRouter_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
