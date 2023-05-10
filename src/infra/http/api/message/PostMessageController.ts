import HttpServer from "../../HttpServer";
import CreateMessage from "../../../../application/usecase/message/CreateMessage";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PostMessageController {

    constructor(readonly httpServer: HttpServer, createMessage: CreateMessage, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("post", "/api/v1/deals/:dealId/messages", async function (params: any, body: any) {
            return await createMessage.execute(parseInt(params.dealId), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}