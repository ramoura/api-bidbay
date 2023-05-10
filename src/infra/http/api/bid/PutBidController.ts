import HttpServer from "../../HttpServer";
import UpdateBid from "../../../../application/usecase/bid/UpdateBid";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PutBidController {

    constructor(readonly httpServer: HttpServer, updateBid: UpdateBid, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("put", "/api/v1/deals/:dealId/bids/:id", async function (params: any, body: any) {
            return await updateBid.execute(parseInt(params.dealId), parseInt(params.id), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}