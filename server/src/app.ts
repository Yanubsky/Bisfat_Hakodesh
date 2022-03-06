import express, {Application, Request, Response} from 'express';
const app : Application = express();
import dotenv from "dotenv";
dotenv.config();
import {router as humash} from './routes/humash';
import {router as gmara} from './routes/gmara';
import {router as halacha} from './routes/halacha';
import {router as kabala} from './routes/kabala';
import {router as mishna} from './routes/mishna';
import {router as nach} from './routes/nach';
app.use('/humash', humash);
app.use('/gmara', gmara);
app.use('/halacha', halacha);
app.use('/kabala', kabala);
app.use('/mishna', mishna);
app.use('/nach', nach);




app.get('/', (req: Request,res: Response)=>{
    res.send(`<h1>Hello</h1>`);
    // should get the homepage (index.html)
    
});



const host : string = '127.0.0.1';
const port : string | number = process.env.PORT || 5555;

app.listen(port, ()=>{
    console.log(`Server is running at http://${host}:${port}!`);   
});