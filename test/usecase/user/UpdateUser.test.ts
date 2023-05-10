import UserRepository from "../../../src/application/repository/UserRepository";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import UpdateUser from "../../../src/application/usecase/user/UpdateUser";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import UserFactory from "./UserFactory";

describe("UpdateUser", () => {

    it("Should update a user ", async () => {
        const userRepository: UserRepository = new UserRepositoryMemory()
        const createUser = new CreateUser(userRepository)
        const updateUser = new UpdateUser(userRepository)
        const user = UserFactory.createUserForTest();

        const userSaved = await createUser.execute(user);

        const userId = userSaved.id;
        user.name = "Name Test Updated";

        const userUpdated = await updateUser.execute(userId, user);

        expect(userUpdated.id).toBe(userSaved.id);
        expect(userUpdated.name).toBe("Name Test Updated");
        expect(userUpdated.email).toBe(user.email);
        expect(userUpdated.login).toBe(user.login);
        expect(userUpdated.location.lat).toBe(user.location.lat);
        expect(userUpdated.location.lng).toBe(user.location.lng);
        expect(userUpdated.location.address).toBe(user.location.address);
        expect(userUpdated.location.city).toBe(user.location.city);
        expect(userUpdated.location.state).toBe(user.location.state);
        expect(userUpdated.location.zip_code).toBe(user.location.zip_code);

    });

    it("Should not update a user with invalid id", async () => {
        const userRepository: UserRepository = new UserRepositoryMemory()
        const updateUser = new UpdateUser(userRepository)
        const user = UserFactory.createUserForTest();
        const userId = -1;

        await expect(() => updateUser.execute(userId, user)).rejects.toThrowError(new Error("User not found"));

    });
});