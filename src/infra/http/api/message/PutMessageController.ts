import HttpServer from "../../HttpServer";
import UpdateMessage from "../../../../application/usecase/message/UpdateMessage";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PutMessageController {

    constructor(readonly httpServer: HttpServer, updateMessage: UpdateMessage, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("put", "/api/v1/deals/:dealId/messages/:messageId", async function (params: any, body: any) {
            return await updateMessage.execute(parseInt(params.dealId), parseInt(params.messageId), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}