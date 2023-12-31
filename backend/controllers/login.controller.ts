import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";

import pool from "../db/connection";

interface JwtPayload {
  id?: string;
  exp?: number;
  role?: string;
  token?: string;
}

const Login = (req: Request, res: Response) => {
  const client = pool.connect();

  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  const getUserQuery = "SELECT * FROM users WHERE user_id = $1";
  const getUserValues = [user_id];

  client
    .then(async (client) => {
      try {
        const {
          rows: [user],
        } = await client.query(getUserQuery, getUserValues);

        if (user) {
          const isSame = await bcrypt.compare(password, user.password);

          var role = "Unknown";

          if (user.role_id === 1) {
            role = "Admin";
          } else if (user.role_id === 2) {
            role = "Faculty";
          } else {
            role = "Student";
          }

          if (isSame) {
            /**
             * secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)
             * TypeError: Right hand side of instanceof is not an object
             *
             * Can be fixed by downgrading
             *  'jsonwebtoken' version '9.0.2' -> '8.5.1'
             *  '@types/jsonwebtoken' version '9.0.3' -> '8.5.1'
             *
             * To fix this in latest 'jsonwebtoken' version '9.0.2' add
             *
             * ```
             * algorithm: "HS256",
             * allowInsecureKeySizes: true,
             * allowInvalidAsymmetricKeyTypes: true,
             * ```
             *
             * Reference: https://github.com/auth0/node-jsonwebtoken/wiki/Migration-Notes:-v8-to-v9
             */

            const token = await jwt.sign(
              {
                id: user.user_id,
                role: role,
              },
              process.env.SECRET_KEY as Secret,
              {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                allowInvalidAsymmetricKeyTypes: true,
              }
            );

            const decoded = (await jwt.verify(
              token,
              process.env.SECRET_KEY as Secret
            )) as JwtPayload;

            // res.cookie("jwt", token, {
            //   maxAge: 1 * 24 * 60 * 60,
            //   httpOnly: true,
            // });

            res.status(201).json({
              message: `Logged in as ${user_id}`,
              info: {
                email: user.email,
                user_id: user.user_id,
                authToken: token,
              },
            });
          } else {
            res.status(401).json({
              message: "Invalid password",
            });
          }
        } else {
          res.status(401).json({
            message: "Invalid user data",
          });
        }
      } catch (err: any) {
        console.error("Error while logging in: ", err);
        res.status(500).json({ message: "Internal server error" });
      }
    })
    .catch((error) => {
      console.error("Error acquiring a database client: ", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

export { Login };
