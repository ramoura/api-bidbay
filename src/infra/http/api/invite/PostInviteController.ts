import HttpServer from "../../HttpServer";
import CreateInvite from "../../../../application/usecase/invite/CreateInvite";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PostInviteController {

    constructor(readonly httpServer: HttpServer, createInvite: CreateInvite, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("post", "/api/v1/users/:userId/invites", async function (params: any, body: any) {
            return await createInvite.execute(parseInt(params.userId), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}