import HttpServer from "../../HttpServer";
import RetrieveDeal from "../../../../application/usecase/deal/RetrieveDeal";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class GetDealController {

    constructor(readonly httpServer: HttpServer, retrieveDeal: RetrieveDeal, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("get", "/api/v1/deals/:id", async function (params: any, body: any) {
            return await retrieveDeal.execute(parseInt(params.id))
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}