/// <reference types="node" />
/// <reference types="qs" />
import { Request, Response } from 'express';
declare const accessLogger: (req: import("http").IncomingMessage, res: import("http").ServerResponse<import("http").IncomingMessage>, callback: (err?: Error | undefined) => void) => void;
declare const errorLogger: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, callback: (err?: Error | undefined) => void) => void;
export { accessLogger, errorLogger };
