import CreateInvite from "../../../src/application/usecase/invite/CreateInvite";
import RetrieveInvite from "../../../src/application/usecase/invite/RetrieveInvite";
import UserRepository from "../../../src/application/repository/UserRepository";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import UserFactory from "../user/UserFactory";
import CreateUser from "../../../src/application/usecase/user/CreateUser";


describe('RetrieveInvite', () => {
    it('should return an invite', async () => {
        const userRepository: UserRepository = new UserRepositoryMemory();
        const createInvite = new CreateInvite(userRepository);
        const retrieveInvite = new RetrieveInvite(userRepository);
        const createUser = new CreateUser(userRepository);
        const user = UserFactory.createUserForTest();
        const userCreated = await createUser.execute(user);


        const inviteCreated = await createInvite.execute(userCreated.id, {
            name: 'Teste',
            email: 'email@email.com',
            user: 1,
            user_invited: 2,
        });

        const invite = await retrieveInvite.execute(userCreated.id, inviteCreated.id);


        expect(invite.id).toBe(1)
        expect(invite.name).toBe('Teste')
        expect(invite.email).toBe('email@email.com')
        expect(invite.user).toBe(1)
        expect(invite.user_invited).toBe(2)
    })
    it('should return an error when invite not found', async () => {
        const userRepository: UserRepository = new UserRepositoryMemory();
        const retrieveInvite = new RetrieveInvite(userRepository);
        const createUser = new CreateUser(userRepository);
        const user = UserFactory.createUserForTest();
        const userCreated = await createUser.execute(user);

        await expect(retrieveInvite.execute(userCreated.id, 1)).rejects.toThrow('Invite not found')
    })
})