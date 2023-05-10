import UserRepository from "../../../src/application/repository/UserRepository";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import UserFactory from "./UserFactory";

describe("CreateUser", () => {
    it("Should create a user ", async () => {
        const userRepository: UserRepository = new UserRepositoryMemory()
        const createUser = new CreateUser(userRepository)
        const user = UserFactory.createUserForTest();

        const userSaved = await createUser.execute(user);

        expect(userSaved.id).not.toBeNull();

    });
    it("Should not create a user with same login ", async () => {
        const userRepository: UserRepository = new UserRepositoryMemory()
        const createUser = new CreateUser(userRepository)
        const user = UserFactory.createUserForTest();

        await createUser.execute(user);

        await expect(createUser.execute(user)).rejects.toThrowError("User already exists");

    });
});