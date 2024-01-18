"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
app.use((0, morgan_1.default)("common"));
// USE HELMET AND CORS MIDDLEWARES
app.use((0, cors_1.default)({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.get("/", async (req, res) => {
    try {
        res.send("Welcome to unit testing guide for nodejs, typescript and express!");
    }
    catch (err) {
        console.log(err);
    }
});
// DB CONNECTION
if (!process.env.MONGODB_URL) {
    throw new Error("MONGO_URI environment variable is not defined");
}
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => {
    console.log("MongoDB connected to the backend successfully");
})
    .catch((err) => console.log(err));
app.get("/", async (req, res) => {
    try {
        res.send("Welcome to unit testing guide for nodejs, typescript and express");
    }
    catch (err) {
        console.log(err);
    }
});
// Serve other routes
app.use("/api/v1/", (0, routes_1.default)());
// Start backend server
const PORT = process.env.PORT || 8800;
// Check if it's not a test environment before starting the server
// if (!process.env.TEST_ENV) {
// if (process.env.NODE_ENV !== "test") {
const server = app.listen(PORT, () => {
    console.log(`Backend server is running at portt ${PORT}`);
});
// }
// }
exports.default = server;
//# sourceMappingURL=index.js.map