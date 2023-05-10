import UserRepository from "../../../src/application/repository/UserRepository";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import CreateInvite from "../../../src/application/usecase/invite/CreateInvite";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import UserFactory from "../user/UserFactory";
import UpdateInvite from "../../../src/application/usecase/invite/UdateInvite";
import RetrieveInvite from "../../../src/application/usecase/invite/RetrieveInvite";

describe('UpdateInvite', () => {
    it('should update a invite', async () => {
        const userRepository: UserRepository = new UserRepositoryMemory();
        const createInvite = new CreateInvite(userRepository);
        const retrieveInvite = new RetrieveInvite(userRepository);
        const updateUser = new UpdateInvite(userRepository);
        const createUser = new CreateUser(userRepository);
        const user = UserFactory.createUserForTest();
        const userCreated = await createUser.execute(user);

        let input = {
            name: 'Teste',
            email: 'email@email.com',
            user: 1,
            user_invited: 2,
        };
        const invite = await createInvite.execute(userCreated.id, input);
        input.name = 'Teste 2';
        await updateUser.execute(userCreated.id, invite.id, input);

        let outputInvite = await retrieveInvite.execute(userCreated.id, invite.id);

        expect(outputInvite.name).toBe('Teste 2')
    })
    it('should update a invite and return invite updated', async () => {
        const userRepository: UserRepository = new UserRepositoryMemory();
        const createInvite = new CreateInvite(userRepository);
        const updateUser = new UpdateInvite(userRepository);
        const createUser = new CreateUser(userRepository);
        const user = UserFactory.createUserForTest();
        const userCreated = await createUser.execute(user);

        let input = {
            name: 'Teste',
            email: 'email@email.com',
            user: 1,
            user_invited: 2,
        };
        const invite = await createInvite.execute(userCreated.id, input);

        input.name = 'Teste 2';
        let outputInvite = await updateUser.execute(userCreated.id, invite.id, input);

        expect(outputInvite.name).toBe('Teste 2')
    })
    it('should not update a invite with invalid user', async () => {
        const userRepository: UserRepository = new UserRepositoryMemory();
        const updateUser = new UpdateInvite(userRepository);

        let input = {
            name: 'Teste',
            email: 'email@email.com',
            user: 1,
            user_invited: 2,
        };
        await expect(updateUser.execute(0, 0, input)).rejects.toThrow('User not found')
    })
    it('should not update a invite with invalid invite', async () => {
        const userRepository: UserRepository = new UserRepositoryMemory();
        const updateUser = new UpdateInvite(userRepository);
        const createUser = new CreateUser(userRepository);
        const user = UserFactory.createUserForTest();
        const userCreated = await createUser.execute(user);

        let input = {
            name: 'Teste',
            email: 'email@email',
            user: 1,
            user_invited: 2,
        };
        await expect(updateUser.execute(userCreated.id, 0, input)).rejects.toThrow('Invite not found')
    })

});