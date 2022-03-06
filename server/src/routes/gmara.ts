import { Router } from 'express';
import { Book } from '../classRepository';

export const router = Router();


router.get('/',async (req,res)=>{
    //  return all gmaras
    let topic: string = JSON.stringify(req.query.topic);
    await Book.buildIndexGallery(topic)
        .then((classResult)=>{
            console.log(`from gmara.ts: \n ${classResult} `);
            return classResult;
        })
        .catch(()=>{
            console.log(`operation failed `);        
        });
});

router.get('/:id', async (req,res)=>{
    // return a specific gmara by id:
    let id: string = req.params.id;   
    await Book.getOneKotar(id)
        .then((classResult)=>{
        return classResult;
        })
        .catch(()=>{
        console.log(`operation failed `);        
        });
});


