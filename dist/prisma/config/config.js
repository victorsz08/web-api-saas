"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonSecret = void 0;
require("dotenv/config");
exports.jsonSecret = {
    secret: process.env.SECRET || ""
};
