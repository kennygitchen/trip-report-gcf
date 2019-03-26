import {Request, Response} from "express";


function helloGET(req:Request, res:Response)  {
    res.send("Hello World");
}

export {helloGET}
