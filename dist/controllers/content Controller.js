"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getContentData = (req, res) => {
    const filepath = path_1.default.join(__dirname, "../../contentjson/content.json");
    fs_1.default.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).json({ message: 'Error finding movie', error: err });
            return;
        }
        try {
            // Parse the JSON data and assert the type as an array of Movie objects
            const moviedata = JSON.parse(data);
            // Filter out movies only from the moviedata
            const movies = moviedata.filter(item => item.Type === "movie");
            const series = moviedata.filter(item => item.Type === "series");
            const anime = moviedata.filter(item => item.Type === "anime");
            res.json({ movies, series, anime });
        }
        catch (err) {
            res.status(400).json({ message: "Parse error", error: err });
        }
    });
};
exports.getContentData = getContentData;
