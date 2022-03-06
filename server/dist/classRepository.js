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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mysql_1 = __importDefault(require("mysql"));
let conn;
let sql;
let query;
let dbPort;
class SqlConnection {
    constructor() {
        this.dbPort = parseInt(process.env.DB_PORT);
    }
    static connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`checking: user:${process.env.DB_USER}, port: ${dbPort}, pass: ${process.env.DB_PASS}`);
            conn = mysql_1.default.createConnection({
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password
            });
            conn.connect((err, success) => {
                if (err) {
                    return err;
                }
                else {
                    console.log(`Connected to DB successfully \n ${JSON.stringify(success)}`);
                }
            });
        });
    }
    static createDB() {
        sql = `CREATE DATABASE IF NOT EXISTS kodesh`;
        query = conn.query(sql, (err, success) => {
            if (err) {
                throw err;
            }
            ;
            // console.log(`Create DB: ` + JSON.stringify(success));
        });
    }
    static createTable() {
        sql = `CREATE TABLE IF NOT EXISTS kodesh.books(
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    kotar VARCHAR (60) NOT NULL,
                    author VARCHAR (60) NOT NULL,
                    topic VARCHAR (60) NOT NULL,
                    publisher VARCHAR (60) NOT NULL,
                    edition VARCHAR (60),
                    instock BOOLEAN NOT NULL,
                    images VARCHAR (255),
                    price INT(10) NOT NULL);`;
        query = conn.query(sql, (err, success) => {
            if (err) {
                throw err;
            }
            ;
            // console.log(`Create table: ` + JSON.stringify(success));
        });
    }
    static dropTable() {
        sql = `DROP TABLE kodesh.books`;
        query = conn.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            ;
            // console.log(`result.message: ` + JSON.stringify(result.message));
        });
    }
    ;
}
SqlConnection.host = process.env.DB_HOST;
SqlConnection.port = dbPort;
SqlConnection.user = process.env.DB_USER;
SqlConnection.password = process.env.DB_PASS;
SqlConnection.connectToDB();
// SqlConnection.dropTable();
SqlConnection.createDB();
SqlConnection.createTable();
// ===================================================================================
/* Request handling
*/
class Book {
    constructor(name, author, topic, publisher, edition, inStock, images, price) {
        this._name = name;
        this._author = author;
        this._topic = topic;
        this._publisher = publisher;
        this._edition = edition;
        this._inStock = inStock;
        this._images = images;
        this._price = price;
        this.insertToDB(this._name, this._author, this._topic, this._publisher, this._edition, this._inStock, this._images, this._price);
    }
    // ==== getters/setters=====
    get id() {
        return Book._id;
    }
    ;
    get name() {
        return this._name;
    }
    ;
    set name(bookName) {
        this._name = bookName;
    }
    ;
    get author() {
        return this._author;
    }
    ;
    set author(authorName) {
        this._author = authorName;
    }
    ;
    get topic() {
        return this._topic;
    }
    ;
    set topic(topic) {
        this._topic = topic;
    }
    ;
    get publisher() {
        return this._publisher;
    }
    ;
    set publisher(publisherName) {
        this._publisher = publisherName;
    }
    ;
    get edition() {
        return this._edition;
    }
    ;
    set edition(edition) {
        this._edition = edition;
    }
    ;
    get inStock() {
        return this._inStock;
    }
    ;
    set inStock(tOrF) {
        this._inStock = tOrF;
    }
    ;
    get images() {
        return this._images;
    }
    ;
    get price() {
        return this._price;
    }
    ;
    set price(newPrice) {
        this._price = newPrice;
    }
    ;
    // class methods
    insertToDB(name, author, topic, publisher, edition, instock, images, price) {
        let values = [
            [name, author, topic, publisher, edition, instock, images, price]
        ];
        sql = `INSERT INTO kodesh.books (kotar, author, topic, publisher, edition, instock, images, price)
                VALUES ?`;
        query = conn.query(sql, [values], (err, result) => {
            if (err) {
                throw err;
            }
            console.log(`${name} was added to the DB successfully!`);
            return result;
        });
    }
    ;
    // -------------------------------------------
    static buildIndexGallery(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                sql = `SELECT * FROM kodesh.books WHERE ${topic} = topic`;
                var value;
                query = conn.query(sql, (err, result) => {
                    if (err)
                        reject;
                    value = JSON.stringify(result);
                    // console.log(`from classRepository: \n ${value}`);
                    resolve(value);
                });
            });
        });
    }
    ;
    static getOneKotar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                sql = `SELECT * FROM kodesh.books WHERE ${id} = id`;
                let value;
                query = conn.query(sql, (err, result) => {
                    if (err)
                        reject;
                    console.log();
                    value = JSON.stringify(result);
                    resolve(value);
                });
            });
        });
    }
    // ----------------------------------------------------------------------------------------
    removeImage(imageToRemove) {
    }
    ;
}
exports.Book = Book;
;
class Gallery extends Book {
}
// --------------------------------------------------------------------------------------------
// const mikraotGdolot = new Book('Mikraot_Gdolot',  "Mefarshim", "Humash", "Or_Hatora", "First_edition", true, "www.w3schools.com", 185);
/*

Client requests:
1. Get index gallery by topic/author/publisher etc.
2. Get a specific book/series by topic/author/publisher etc.
*/
/*
Admin requests:
1. Post a new book/series
2. Delete a book/series
3. Update a book/series

*/
