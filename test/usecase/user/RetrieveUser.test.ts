import CreateUser from "../../../src/application/usecase/user/CreateUser";
import RetrieveUser from "../../../src/application/usecase/user/RetrieveUser";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import UserFactory from "./UserFactory";

describe("RetrieveUser", () => {
    it("Should retrieve a user", async () => {
        const userRepository = new UserRepositoryMemory()
        const retrieveUser = new RetrieveUser(userRepository)
        const createUser = new CreateUser(userRepository)
        const user = UserFactory.createUserForTest();

        const userSaved = await createUser.execute(user);

        const userRetrieved = await retrieveUser.execute(userSaved.id);

        expect(userRetrieved.id).toBe(userSaved.id);
        expect(userRetrieved.name).toBe(user.name);
        expect(userRetrieved.email).toBe(user.email);
        expect(userRetrieved.login).toBe(user.login);
        expect(userRetrieved.location.lat).toBe(user.location.lat);
        expect(userRetrieved.location.lng).toBe(user.location.lng);
        expect(userRetrieved.location.address).toBe(user.location.address);
        expect(userRetrieved.location.city).toBe(user.location.city);
        expect(userRetrieved.location.state).toBe(user.location.state);
        expect(userRetrieved.location.zip_code).toBe(user.location.zip_code);
    });
    it("Should not retrieve a user with invalid id", async () => {
        const userRepository = new UserRepositoryMemory()
        const retrieveUser = new RetrieveUser(userRepository)
        const userId = -1;

        await expect(() => retrieveUser.execute(userId)).rejects.toThrowError(new Error("User not found"));
    });
});