import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { issueService } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssueIntoDB(req.body);

    sendResponse(res, {
      status: 201,
      success: true,
      message: "Issue created successfully",
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

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB();

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Issues retrived successfully",
      data: result.rows,
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

const getSingleIssue = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await issueService.getSingleIssueFromDB(id as string);

    if (result.rows.length === 0) {
      sendResponse(res, {
        status: 404,
        success: false,
        message: "issue not found",
        data: {},
      });
    }

    sendResponse(res, {
      status: 200,
      success: true,
      message: "Issue retrived successfully",
      data: result.rows,
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

const updateIssue = async (req: Request, res: Response) => {};

const deleteIssue = async (req: Request, res: Response) => {};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
