import type { NextFunction, Request, Response } from "express";

export const logger = ( req : Request, res : Response, next : NextFunction) => {

    console.log(`[${new Date().toISOString()}] | ${req.method.padEnd(6)} | ${req.url}`);

    next()
}