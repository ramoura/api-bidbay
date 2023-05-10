import HttpServer from "../../HttpServer";
import RetrieveDelivery from "../../../../application/usecase/delivery/RetrieveDelivery";

export default class GetDeliveryController {

    constructor(readonly httpServer: HttpServer, retrieveDelivery: RetrieveDelivery) {
        httpServer.register("get", "/api/v1/deals/:dealId/deliveries", async function (params: any, body: any) {
            return await retrieveDelivery.execute(parseInt(params.dealId))
        })
    }
}