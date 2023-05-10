import HttpServer from "../../HttpServer";
import CreateDeal from "../../../../application/usecase/deal/CreateDeal";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PostDealController {

    constructor(readonly httpServer: HttpServer, createDeal: CreateDeal, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("post", "/api/v1/deals", async function (params: any, body: any) {
            return await createDeal.execute(body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}