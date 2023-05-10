import HttpServer from "../../HttpServer";
import UpdateInvite from "../../../../application/usecase/invite/UdateInvite";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PutInviteController {

    constructor(readonly httpServer: HttpServer, updateInvite: UpdateInvite, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("put", "/api/v1/users/:userId/invites/:inviteId", async function (params: any, body: any) {
            return await updateInvite.execute(parseInt(params.userId), parseInt(params.inviteId), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}