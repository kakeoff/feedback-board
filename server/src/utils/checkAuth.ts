import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthRequest, DecodedToken } from "../types/authTypes";

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded: DecodedToken = jwt.verify(token, "secret") as DecodedToken;
      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
  } else {
    return res.status(403).json({
      message: "Access denied",
    });
  }
};
