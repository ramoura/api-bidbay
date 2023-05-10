import HttpServer from "../../HttpServer";
import RetrieveUser from "../../../../application/usecase/user/RetrieveUser";
import AuthorizationMiddleware from "../AuthorizationMiddleware";


export default class GetUserController {

    constructor(readonly httpServer: HttpServer, retrieveUser: RetrieveUser, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("get", "/api/v1/users/:id", async function (params: any, body: any) {
            const outputUser = {
                body: await retrieveUser.execute(parseInt(params.id)),
                status: 200
            };
            return outputUser
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware));
    }
}