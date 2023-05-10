import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import CreateBid from "../../../src/application/usecase/bid/CreateBid";
import UpdateBid from "../../../src/application/usecase/bid/UpdateBid";
import TestHelper from "../TestHelper";


describe('UpdateBid', () => {
    it('should update a bid ', async function () {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const createBid = new CreateBid(dealRepository);
        const updateBid = new UpdateBid(dealRepository);
        const deal = await TestHelper.createADeal(dealRepository);

        let input = {
            user_id: 1,
            accepted: false,
            value: 1,
            description: 'teste'
        };
        const bidCreated = await createBid.execute(deal.id, input);
        let inputUpdate = {
            user_id: 1,
            accepted: false,
            value: 2,
            description: 'teste2'
        }
        const bidUpdated = await updateBid.execute(deal.id, bidCreated.id, inputUpdate);


        expect(bidUpdated.value).toBe(2)
        expect(bidUpdated.description).toBe('teste2')

    });
})