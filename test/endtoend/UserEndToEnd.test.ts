import request from "supertest";
import ExpressAdapter from "../../src/infra/http/ExpressAdapter";
import GetUserController from "../../src/infra/http/api/user/GetUserController";
import RetrieveUser from "../../src/application/usecase/user/RetrieveUser";
import UserRepositoryMemory from "../../src/infra/repository/memory/UserRepositoryMemory";
import TokenGenerate from "../../src/domain/service/TokenGenerate";
import AuthorizationMiddleware from "../../src/infra/http/api/AuthorizationMiddleware";
import PostUserController from "../../src/infra/http/api/user/PostUserController";
import CreateUser from "../../src/application/usecase/user/CreateUser";

describe("API User test.", () => {
    test("Should create a User", async () => {
        const httpServer = new ExpressAdapter()
        const userRepository = new UserRepositoryMemory()
        new PostUserController(httpServer, new CreateUser(userRepository));

        const res = await request(httpServer.app)
            .post("/api/v1/users")
            .send({
                name: "Name Test",
                email: "email@email.com",
                login: "login",
                password: "password",
                location:
                    {
                        lat: 123,
                        lng: 1234,
                        address: "Rua",
                        city: "Cidade",
                        state: "Estado",
                        zip_code: 123456
                    }
            })
        expect(res.body.name).toBe("Name Test");
        expect(res.status).toEqual(201);
    });

    test("Should not acess API without authenticate token", async () => {
        const httpServer = new ExpressAdapter()
        const userRepository = new UserRepositoryMemory()
        const tokenGenerator = new TokenGenerate('secret')
        const authorizationMiddleware = new AuthorizationMiddleware(tokenGenerator)

        new GetUserController(httpServer, new RetrieveUser(userRepository), authorizationMiddleware);

        const res = await request(httpServer.app).get("/api/v1/users/0");
        expect(res.body).toEqual({error: "Unauthorized"});
        expect(res.status).toEqual(401);
    });
});