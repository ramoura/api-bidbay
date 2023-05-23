import HttpServer from "./HttpServer";
import express, {RequestHandler} from "express";
import NotFoundError from "../../application/error/NotFoundErro";

export default class ExpressAdapter implements HttpServer {
    app: any

    constructor() {
        this.app = express()
        this.app.use(express.json())
    }


    register(method: string, path: string, handler: Function, checkAuth?: Function): void {
        //if (checkAuth) {
        //    this.app[method](path, checkAuth, this.handler(handler))
        //} else {
        this.app[method](path, this.handler(handler))
        //}
    }

    registerUpload(path: string, handler: RequestHandler, func: Function): void {
        this.app.post(path, handler, async function (req: any, res: any) {
            const result = await func(req.params, req.file)
            res.send(result)
        });
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
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