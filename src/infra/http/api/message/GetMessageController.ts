import HttpServer from "../../HttpServer";
import RetrieveMessage from "../../../../application/usecase/message/RetrieveMessage";

export default class GetMessageController {

    constructor(readonly httpServer: HttpServer, retrieveMessage: RetrieveMessage) {
        httpServer.register("get", "/api/v1/deals/:dealId/messages/:messageId", async function (params: any, body: any) {
            return await retrieveMessage.execute(parseInt(params.dealId), parseInt(params.messageId))
        })
    }
}