import HttpServer from "../../HttpServer";
import RetrieveBid from "../../../../application/usecase/bid/RetrieveBid";

export default class GetBidController {

    constructor(readonly httpServer: HttpServer, retrieveBid: RetrieveBid) {
        httpServer.register("get", "/api/v1/deals/:dealId/bids/:id", async function (params: any, body: any) {
            return await retrieveBid.execute(parseInt(params.dealId), parseInt(params.id))
        })
    }
}