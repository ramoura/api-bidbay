import HttpServer from "../../HttpServer";
import UpdateDeal from "../../../../application/usecase/deal/UpdateDeal";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PutDealController {

    constructor(readonly httpServer: HttpServer, updateDeal: UpdateDeal, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("put", "/api/v1/deals/:id", async function (params: any, body: any) {
            return await updateDeal.execute(parseInt(params.id), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}