import HttpServer from "../../HttpServer";
import AuthenticateUser from "../../../../application/usecase/auth/AuthenticateUser";

export default class AuthenticateController {

    constructor(readonly httpServer: HttpServer, authenticateUser: AuthenticateUser) {
        httpServer.register("post", "/api/v1/authenticate", async function (params: any, body: any) {
            return await authenticateUser.execute(body)
        })
    }
}