import HttpServer from "../../HttpServer";
import RetrieveBids from "../../../../application/usecase/bid/RetrieveBids";

export default class GetBidsController {

    constructor(readonly httpServer: HttpServer, retrieveBids: RetrieveBids) {
        httpServer.register("get", "/api/v1/deals/:dealId/bids", async function (params: any, body: any) {
            return await retrieveBids.execute(parseInt(params.dealId))
        })
    }
}