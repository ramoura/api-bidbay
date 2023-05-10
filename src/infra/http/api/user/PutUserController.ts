import HttpServer from "../../HttpServer";
import UpdateUser from "../../../../application/usecase/user/UpdateUser";
import AuthorizationMiddleware from "../AuthorizationMiddleware";

export default class PutUserController {

    constructor(readonly httpServer: HttpServer, updateUser: UpdateUser, authorizationMiddleware: AuthorizationMiddleware) {
        httpServer.register("put", "/api/v1/users/:id", async function (params: any, body: any) {
            return await updateUser.execute(parseInt(params.id), body)
        }, authorizationMiddleware.checkAuth.bind(authorizationMiddleware))
    }
}