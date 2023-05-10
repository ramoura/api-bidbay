import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import UserRepository from "../../../src/application/repository/UserRepository";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import CreateMessage from "../../../src/application/usecase/message/CreateMessage";
import RetrieveMessage from "../../../src/application/usecase/message/RetrieveMessage";
import UserFactory from "../user/UserFactory";
import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import TestHelper from "../TestHelper";


describe('RetrieveMessage', () => {
    it('should retrieve a message', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const userRepository: UserRepository = new UserRepositoryMemory();
        const createUser = new CreateUser(userRepository);
        const createMessage = new CreateMessage(userRepository, dealRepository);
        const retrieveMessage = new RetrieveMessage(dealRepository);

        const deal = await TestHelper.createADeal(dealRepository);
        const user = UserFactory.createUserForTest();
        await createUser.execute(user);

        let input = {
            user_id: 1,
            title: 'title',
            message: 'message'
        };
        const messageCreated = await createMessage.execute(deal.id, input);

        const messageRetrieved = await retrieveMessage.execute(deal.id, messageCreated.id);

        expect(messageRetrieved.id).toBe(1)
    });

    it('should throw an error when message not found', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const retrieveMessage = new RetrieveMessage(dealRepository);

        const deal = await TestHelper.createADeal(dealRepository);

        await expect(retrieveMessage.execute(deal.id, 1)).rejects.toThrow('Message not found')
    })
})