import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUserIntoDB(req.body)
    
    
    sendResponse(res, {
      status: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      status: 500,
      success: false,
      message: error.message,
      error,
    });
  }
};

export const authController = {
  signupUser,
};
