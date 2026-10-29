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


const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    const {accessToken, user} = result;

        res.cookie("accessToken", accessToken,{
      secure: false, //In production True
      httpOnly: true,
      sameSite: 'lax'
    })
    
    
    sendResponse(res, {
      status: 200,
      success: true,
      message: "Login successful",
      data: {accessToken, user},
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
  loginUser,
};
