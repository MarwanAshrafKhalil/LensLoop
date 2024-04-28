import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "..";
import { errorHandler } from "./error";

interface AuthenticatedReq extends Request {
  user?: JwtPayload;
}

export const authJWT = (
  req: AuthenticatedReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "login required"));
  }

  jwt.verify(token, JWT_SECRET, (err: any, decodedToken: any) => {
    console.log("decodeD: ", decodedToken);
    if (err || !decodedToken) {
      return errorHandler(403, "Failed to authenticate token");
    }

    req.user = decodedToken;
    next();
  });
};
