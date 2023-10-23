import { Request, Response } from "express";

const TokenVerifierController = (req: Request, res: Response) => {
  const user_id = req.user_id;

  res.status(200).json({
    message: `Logged in as ${user_id}!`,
  });
};

export { TokenVerifierController };
