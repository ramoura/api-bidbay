import HttpServer from "../../HttpServer";
import CreateUser from "../../../../application/usecase/user/CreateUser";

export default class PostUserController {

    constructor(readonly httpServer: HttpServer, createUser: CreateUser) {
        httpServer.register("post", "/api/v1/users", async function (params: any, body: any) {
            const outputUser = {
                body: await createUser.execute(body),
                status: 201
            };

            return outputUser
        })
    }
}