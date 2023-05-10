import CreateInvite from "../../../src/application/usecase/invite/CreateInvite";
import UserRepository from "../../../src/application/repository/UserRepository";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import UserFactory from "../user/UserFactory";


describe('CreateInvite', () => {
    test('should create a invite', async () => {
        const userRepository: UserRepository = new UserRepositoryMemory();
        const createInvite = new CreateInvite(userRepository);
        const createUser = new CreateUser(userRepository);
        const user = UserFactory.createUserForTest();
        const userCreated = await createUser.execute(user);

        const invite = await createInvite.execute(userCreated.id, {
            name: 'Teste',
            email: 'email@email.com',
            user: 1,
            user_invited: 2,
        });

        expect(invite.id).toBe(1)
    })
})