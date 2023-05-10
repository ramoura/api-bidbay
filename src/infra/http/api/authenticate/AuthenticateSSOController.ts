import HttpServer from "../../HttpServer";
import AuthenticateSSO from "../../../../application/usecase/auth/AuthenticateSSO";

export default class AuthenticateSSOController {

    constructor(readonly httpServer: HttpServer, authenticateSSO: AuthenticateSSO) {
        httpServer.register("post", "/api/v1/authenticateSSO", async function (params: any, body: any) {
            return await authenticateSSO.execute(body)
        })
    }
}