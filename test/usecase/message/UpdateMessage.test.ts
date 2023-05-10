import UserRepository from "../../../src/application/repository/UserRepository";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import CreateUser from "../../../src/application/usecase/user/CreateUser";
import CreateMessage from "../../../src/application/usecase/message/CreateMessage";
import UserFactory from "../user/UserFactory";
import UpdateMessage from "../../../src/application/usecase/message/UpdateMessage";
import OutputMessage from "../../../src/application/usecase/message/dto/OutputMessage";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import DealRepository from "../../../src/application/repository/DealRepository";
import TestHelper from "../TestHelper";

describe('UpdateMessage', () => {
    it('should update a message', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const userRepository: UserRepository = new UserRepositoryMemory();
        const createUser = new CreateUser(userRepository);
        const createMessage = new CreateMessage(userRepository, dealRepository);
        const updateMessage = new UpdateMessage(dealRepository);
        const deal = await TestHelper.createADeal(dealRepository);
        const user = UserFactory.createUserForTest();
        await createUser.execute(user);

        let input = {
            user_id: 1,
            title: 'title',
            message: 'message'
        };
        const messageCreated = await createMessage.execute(deal.id, input);

        const messageUpdated: OutputMessage = await updateMessage.execute(1, messageCreated.id, {
            user_id: 1,
            title: 'title updated',
            message: 'message updated'
        })

        expect(messageUpdated.title).toBe('title updated')
    })

    it('should throw an error when message not found', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const updateMessage = new UpdateMessage(dealRepository);
        const deal = await TestHelper.createADeal(dealRepository);

        await expect(updateMessage.execute(deal.id, 1, {
            user_id: 1,
            title: 'title updated',
            message: 'message updated'
        })).rejects.toThrowError('Message not found')
    })

})