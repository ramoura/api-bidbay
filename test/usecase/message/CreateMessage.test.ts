import CreateMessage from "../../../src/application/usecase/message/CreateMessage";
import UserFactory from "../user/UserFactory";
import UserRepository from "../../../src/application/repository/UserRepository";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import TestHelper from "../TestHelper";


describe('CreateMessage', () => {
    it('should create a message', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const deal = await TestHelper.createADeal(dealRepository);

        const userRepository: UserRepository = new UserRepositoryMemory();
        const createUser = new CreateUser(userRepository);
        const createMessage = new CreateMessage(userRepository, dealRepository);

        const user = UserFactory.createUserForTest();
        await createUser.execute(user);

        let input = {
            user_id: 1,
            title: 'title',
            message: 'message'
        };
        const messageCreated = await createMessage.execute(deal.id, input);

        expect(messageCreated.id).toBe(1)
    });
    it('should throw an error when user not found', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const userRepository: UserRepository = new UserRepositoryMemory();
        const createMessage = new CreateMessage(userRepository, dealRepository);

        const deal = await TestHelper.createADeal(dealRepository);
        let input = {
            user_id: 1,
            title: 'title',
            message: 'message'
        };
        await expect(createMessage.execute(deal.id, input)).rejects.toThrow('User not found')
    });
})