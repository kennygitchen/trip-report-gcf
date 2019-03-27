import {Request, Response} from "express";
import {Tap} from "@trip-report/model";



function ingest(req: Request, res: Response) {
    let tap = req.body.tap;
    if (!tap) {
        res.status(400).send('No tap defined!');
        return;
    }

    //
    // parse tap and write to DB
    //
    //1. parse tap
    let newTap = Tap.fromCSV(tap);

    //2. write to db
    console.log(`push tap into DB, tap=${newTap}`);

    //3. send event out
    res.status(200).send('Tap has been processed successfully.');

}

export {ingest}

// local testing
//functions call tap-ingest --data='{"tap":"1, 22-01-2018 13:00:00, ON, Stop1, Company1, Bus37, 5500005555555559"}'

// dev testing
//gcloud functions call tap-ingest --data='{"tap":"1, 22-01-2018 13:00:00, ON, Stop1, Company1, Bus37, 5500005555555559"}'