import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "..";
import { errorHandler } from "./error";

interface AuthenticatedReq extends Request {
  userId?: JwtPayload;
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
    if (err) {
      // Check for specific error cases
      if (err.name === "TokenExpiredError") {
        return next(errorHandler(403, "Token expired"));
      } else {
        return next(errorHandler(403, "Failed to authenticate token"));
      }
    }

    // If decodedToken is falsy, jwt.verify failed to decode the token
    if (!decodedToken) {
      return next(errorHandler(403, "Failed to decode token"));
    }

    console.log("decodedToken: ", decodedToken);
    req.userId = decodedToken.id;
    next();
  });
};
