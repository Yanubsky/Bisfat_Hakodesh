import { Router } from 'express';
export const router = Router();


router.get('/',(req,res)=>{
    //  return all nach
    console.log(`you're in Nach route!`);
});