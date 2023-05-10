import HttpServer from "../../HttpServer";
import CreateBid from "../../../../application/usecase/bid/CreateBid";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PostBidController {

    constructor(readonly httpServer: HttpServer, createBid: CreateBid, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("post", "/api/v1/deals/:dealId/bids", async function (params: any, body: any) {
            return await createBid.execute(parseInt(params.dealId), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}