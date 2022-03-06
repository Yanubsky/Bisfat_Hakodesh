"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const classRepository_1 = require("../classRepository");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  return all gmaras
    let topic = JSON.stringify(req.query.topic);
    yield classRepository_1.Book.buildIndexGallery(topic)
        .then((classResult) => {
        console.log(`from gmara.ts: \n ${classResult} `);
        return classResult;
    })
        .catch(() => {
        console.log(`operation failed `);
    });
}));
exports.router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // return a specific gmara by id:
    let id = req.params.id;
    yield classRepository_1.Book.getOneKotar(id)
        .then((classResult) => {
        return classResult;
    })
        .catch(() => {
        console.log(`operation failed `);
    });
}));
