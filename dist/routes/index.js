"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const productRoute_1 = __importDefault(require("./productRoute"));
const router = express_1.default.Router();
exports.default = () => {
    // USER
    (0, userRoute_1.default)(router);
    //   PRODUCT
    (0, productRoute_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map