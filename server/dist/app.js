"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const humash_1 = require("./routes/humash");
const gmara_1 = require("./routes/gmara");
const halacha_1 = require("./routes/halacha");
const kabala_1 = require("./routes/kabala");
const mishna_1 = require("./routes/mishna");
const nach_1 = require("./routes/nach");
app.use('/humash', humash_1.router);
app.use('/gmara', gmara_1.router);
app.use('/halacha', halacha_1.router);
app.use('/kabala', kabala_1.router);
app.use('/mishna', mishna_1.router);
app.use('/nach', nach_1.router);
app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`);
    // should get the homepage (index.html)
});
const host = '127.0.0.1';
const port = process.env.PORT || 5555;
app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}!`);
});
