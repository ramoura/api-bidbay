import CreateDelivery from "../../../src/application/usecase/delivery/CreateDelivery";
import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import RetrieveDelivery from "../../../src/application/usecase/delivery/RetrieveDelivery";
import TestHelper from "../TestHelper";

describe('CreateDelivery', () => {
    it('should create a delivery', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const createDelivery = new CreateDelivery(dealRepository);
        const retrieveDelivery = new RetrieveDelivery(dealRepository);
        const deal = await TestHelper.createADeal(dealRepository);

        let input = {
            user_id: 1
        };
        await createDelivery.execute(deal.id, input);

        const deliveryFound = await retrieveDelivery.execute(deal.id)

        expect(deliveryFound.delivery.user_id).toBe(1)
    })
})