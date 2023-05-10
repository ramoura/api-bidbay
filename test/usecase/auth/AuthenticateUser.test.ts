import AuthenticateUser from "../../../src/application/usecase/auth/AuthenticateUser";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import UserFactory from "../user/UserFactory";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import TokenGenerate from "../../../src/domain/service/TokenGenerate";


describe("AuthenticateUser", () => {
    it("Should authenticate a valid password", async () => {
        let userRepositoryMemory = new UserRepositoryMemory();
        const tokenGenerate = new TokenGenerate('secret');
        const createUser = new CreateUser(userRepositoryMemory);
        const authenticateUser = new AuthenticateUser(userRepositoryMemory, tokenGenerate);
        const user = UserFactory.createUserForTest("valid_login", "valid_password");
        await createUser.execute(user);

        const output = await authenticateUser.execute({login: "valid_login", password: "valid_password"});
        expect(output.name).toBe("Name Test");
        expect(output.token).not.toBeNull();
    });
    it("Should not authenticate a invalid password", async () => {
        let userRepositoryMemory = new UserRepositoryMemory();
        const tokenGenerate = new TokenGenerate('secret');
        const createUser = new CreateUser(userRepositoryMemory);
        const authenticateUser = new AuthenticateUser(userRepositoryMemory, tokenGenerate);
        const user = UserFactory.createUserForTest("valid_login", "valid_password");
        await createUser.execute(user);

        await expect(authenticateUser.execute({
            login: "valid_login",
            password: "invalid_password"
        })).rejects.toThrow("Authentication failed");
    });
});