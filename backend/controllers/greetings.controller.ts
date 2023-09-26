import { Request, Response } from "express";

const getGreetings = (req: Request, res: Response) => {
    res.status(200).json({
        message: "HELLO!"
    })
}

export { getGreetings };