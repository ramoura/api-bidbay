import CreateInvite from "../../../src/application/usecase/invite/CreateInvite";
import RetrieveInvites from "../../../src/application/usecase/invite/RetrieveInvites";
import UserRepository from "../../../src/application/repository/UserRepository";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import UserFactory from "../user/UserFactory";

describe('RetrieveInvites', () => {
    it('should return an invite list', async () => {
        const userRepository: UserRepository = new UserRepositoryMemory();
        const createInvite = new CreateInvite(userRepository);
        const retrieveInvites = new RetrieveInvites(userRepository);
        const createUser = new CreateUser(userRepository);
        const user = UserFactory.createUserForTest();
        const userCreated = await createUser.execute(user);

        let inputInvite = {
            name: 'Teste 1',
            email: 'email1@email.com',
            user: 1,
            user_invited: 2,
        };
        await createInvite.execute(userCreated.id, inputInvite);
        await createInvite.execute(userCreated.id, inputInvite);


        const invites = await retrieveInvites.execute(userCreated.id);


        expect(invites).toHaveLength(2)
    })
})