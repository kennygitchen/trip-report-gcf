import {Request, Response} from "express";


function ingest(req:Request, res:Response)  {
    let tap = req.body.tap;
    if(!tap) {
        res.status(400).send('No tap defined!');
    } else {
        // process tap
        console.error(`processing tap: ${tap}`);
        res.status(200).send('Tap has been processed successfully.');
    }
}

export {ingest}
