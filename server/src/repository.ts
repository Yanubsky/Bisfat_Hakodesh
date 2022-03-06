import mysql, { Connection, Types } from 'mysql';
export module repository{
    let conn: Connection;
    function connectToDB(){
        conn = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'Clinton99'
        }); 
        conn.connect((err,success)=>{
            if(err){ return err }
            else{ console.log(`Connected to DB successfully`) }
        });
    }
    connectToDB();
    function createDB(){
        let sql = `CREATE DATABASE IF NOT EXISTS kodesh`;
        conn.query(sql, (err,result)=>{
            if (err) {throw err};
            console.log(`DB created` + JSON.stringify(result));
        }); }
    createDB();

    function createTable(){
        let sql = `CREATE TABLE IF NOT EXISTS kodesh.books(
                    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                    name VARCHAR (60) NOT NULL,
                    author VARCHAR (60) NOT NULL,
                    topic VARCHAR (60) NOT NULL,
                    publisher VARCHAR (60) NOT NULL,
                    edition VARCHAR (60),
                    instock BOOLEAN NOT NULL,
                    images VARCHAR (255),
                    price INT(10) NOT NULL);`;
        conn.query(sql, (err,result)=>{
            if (err) {throw err};
            console.log(`table created` + JSON.stringify(result));
        });
    }
    createTable();

    function dropTable(){
        let sql =`DROP TABLE kodesh.books`;
        conn.query(sql, (err,result)=>{
            if (err) {throw err};
            console.log(`table created` + JSON.stringify(result));
        });
    };

    // // dropTable();

    // ===================================================================================

    /* Request handling 

    Client requests:
    1. Get index gallery by topic/author/publisher etc.
    2. Get a specific book/series by topic/author/publisher etc.
    */
    export function buildIndexGallery(bookId: string){
        let sql = `SELECT * FROM kodesh.books WHERE ${bookId} = id`; 
        // TODO: change the code in a way that the function will be able to get 
        //   any type of info about the book, not just id (for example: switch-case)
        conn.query(sql, (err,result)=>{
            if(err) throw err;
            console.log(JSON.stringify(result));
            return JSON.stringify(result);
        });
    };
    // exports.buildIndexGallery = buildIndexGallery;


    /*
    Admin requests:
    1. Post a new book/series
    2. Delete a book/series
    3. Update a book/series 
    //check this source for utility type Partial<Type>
    // for implementig a fine update method code

    */
}