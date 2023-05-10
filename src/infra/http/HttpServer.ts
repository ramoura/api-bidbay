import {RequestHandler} from "express";

export default interface HttpServer {
    register(method: string, path: string, handler: Function, checkAuth?: Function): void

    registerUpload(path: string, handler: RequestHandler, func: Function): void

    listen(port: number): void
}