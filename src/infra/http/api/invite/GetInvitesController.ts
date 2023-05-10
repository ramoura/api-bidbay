import HttpServer from "../../HttpServer";
import RetrieveInvites from "../../../../application/usecase/invite/RetrieveInvites";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class GetInvitesController {

    constructor(readonly httpServer: HttpServer, retrieveInvites: RetrieveInvites, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("get", "/api/v1/users/:userId/invites", async function (params: any, body: any) {
            return await retrieveInvites.execute(parseInt(params.userId))
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}