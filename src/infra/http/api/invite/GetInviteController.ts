import HttpServer from "../../HttpServer";
import RetrieveInvite from "../../../../application/usecase/invite/RetrieveInvite";
import AuthorizationMiddleware from "../AuthorizationMiddleware";


export default class GetInviteController {

    constructor(readonly httpServer: HttpServer, retrieveInvite: RetrieveInvite, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("get", "/api/v1/users/:userId/invites/:inviteId", async function (params: any, body: any) {
            return await retrieveInvite.execute(parseInt(params.userId), parseInt(params.inviteId))
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}