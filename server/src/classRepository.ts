import mysql, { Connection, Query } from 'mysql';
let conn: Connection;
let sql: string;
let query: Query;
let dbPort:number
class SqlConnection{
    dbPort = parseInt(process.env.DB_PORT);
    static host: string =process.env.DB_HOST;
    static port: number =dbPort;
    static user: string =process.env.DB_USER;
    static password: string =process.env.DB_PASS;

    static async connectToDB(){

        console.log(`checking: user:${process.env.DB_USER}, port: ${dbPort}, pass: ${process.env.DB_PASS}`);
        conn = mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user, 
            password: this.password
        }); 
        conn.connect((err,success)=>{
            if(err){ return err }
            else{ console.log(`Connected to DB successfully \n ${JSON.stringify(success)}`) }
        });
    }
    
    static createDB(){
        sql = `CREATE DATABASE IF NOT EXISTS kodesh`;
        query = conn.query(sql, (err,success)=>{
            if (err) {throw err};
            // console.log(`Create DB: ` + JSON.stringify(success));
        }); }

    static createTable(){
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
        query = conn.query(sql, (err,success)=>{
            if (err) {throw err};
            // console.log(`Create table: ` + JSON.stringify(success));
        });
    }

    static dropTable(){
        sql =`DROP TABLE kodesh.books`;
        query = conn.query(sql, (err,result)=>{
            if (err) {throw err};
            // console.log(`result.message: ` + JSON.stringify(result.message));
        });
    };

}

SqlConnection.connectToDB();
// SqlConnection.dropTable();
SqlConnection.createDB();
SqlConnection.createTable();


// ===================================================================================

/* Request handling 
*/
export class Book{
    public static readonly _id:number; 
    public _name:string; 
    public _author:string; 
    public _topic:string; 
    public _publisher:string;
    public _edition:string;
    public _inStock:boolean; 
    public _images:string;
    public _price:number

    constructor(name:string, author:string, topic:string, 
        publisher:string, edition:string, inStock:boolean, 
        images:string, price:number)
    {
        this._name = name;
        this._author = author;
        this._topic = topic;
        this._publisher = publisher;
        this._edition = edition;
        this._inStock = inStock;
        this._images = images;
        this._price =  price;

        this.insertToDB(
            this._name, this._author, this._topic, this._publisher,
            this._edition, this._inStock, this._images, this._price
        );
    }
    // ==== getters/setters=====
    public get id(){
        return Book._id;
    };

    public get name(){
        return this._name;
    };
    public set name(bookName){
        this._name = bookName;
    };

    public get author(){
        return this._author;
    };
    public set author(authorName){
        this._author = authorName;
    };

    public get topic(){
        return this._topic;
    };
    public set topic(topic){
        this._topic = topic;
    };

    public get publisher(){
        return this._publisher;
    };
    public set publisher(publisherName){
        this._publisher = publisherName;
    };

    public get edition(){
        return this._edition;
    };
    public set edition(edition){
        this._edition = edition;
    };

    public get inStock(){
        return this._inStock;
    };
    public set inStock(tOrF){
        this._inStock = tOrF;
    };

    public get images(){
        return this._images;
    };

    public get price(){
        return this._price;
    };
    public set price(newPrice){
        this._price = newPrice;
    };
    // class methods
    protected insertToDB(name:string, author:string, topic:string, 
                         publisher:string, edition:string, instock:boolean, 
                         images:string, price:number){
        let values = [
            [name, author, topic, publisher, edition, instock, images, price]
        ];
        sql = `INSERT INTO kodesh.books (kotar, author, topic, publisher, edition, instock, images, price)
                VALUES ?`;
        query = conn.query(sql, [values], (err,result)=>{
            if(err) {throw err}
            console.log(`${name} was added to the DB successfully!`);   
            return result;
        });
    };
    // -------------------------------------------
    public static async buildIndexGallery(topic: string):Promise<string>{
        return new Promise((resolve, reject)=>{
            sql = `SELECT * FROM kodesh.books WHERE ${topic} = topic`; 
            var value: string;
            query = conn.query(sql, (err,result)=>{
                if(err) reject;
                value = JSON.stringify(result);
                // console.log(`from classRepository: \n ${value}`);
                resolve(value);
            });
        });    
    };

    public static async getOneKotar(id: string):Promise<string>{
        return new Promise((resolve, reject)=>{
            sql = `SELECT * FROM kodesh.books WHERE ${id} = id`;
            let value: string;
            query = conn.query(sql, (err,result)=>{
                if(err) reject;
                console.log();
                
                value = JSON.stringify(result);
                resolve(value);
            })
        })
    }
    
    // ----------------------------------------------------------------------------------------
    public removeImage(imageToRemove:string){

    };
    

};

class Gallery extends Book{

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
