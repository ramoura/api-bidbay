import HttpServer from "./HttpServer";
import NotFoundError from "../../application/error/NotFoundErro";
import express from "express";


export default class FunctionsGoogleCloudAdapter implements HttpServer {
    public app: any

    constructor() {
        this.app = express()
        this.app.use(express.json())
    }

    register(method: string, path: string, handler: Function, checkAuth?: Function): void {
        this.app[method](path, this.handler(handler))
    }

    registerUpload(path: string, handler: any, func: Function): void {
        throw new Error("Method not implemented.");
    }

    listen(port: number): void {
    }

    private handler(handler: Function) {
        return async function (req: any, res: any) {
            try {
                const result = await handler(req.params, req.body);
                if (result.status && result.body) {
                    res.status(result.status).send(result.body);
                } else {
                    res.send(result);
                }
            } catch (error) {
                console.error("Erro no handler:", error);
                if (error instanceof NotFoundError) {
                    const err = error as NotFoundError
                    res.status(404).send({error: err.message});
                    return;
                }
                if (error instanceof Error) {
                    const err = error as Error
                    res.status(400).send({error: err.message});
                    return;
                }

            }
        };
    }
}
