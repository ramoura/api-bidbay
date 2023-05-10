import HttpServer from "../../HttpServer";
import CreateDelivery from "../../../../application/usecase/delivery/CreateDelivery";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PostDeliveryController {

    constructor(readonly httpServer: HttpServer, createDelivery: CreateDelivery, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("post", "/api/v1/deals/:dealId/deliveries", async function (params: any, body: any) {
            return await createDelivery.execute(parseInt(params.dealId), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}