import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import CreateBid from "../../../src/application/usecase/bid/CreateBid";
import RetrieveBid from "../../../src/application/usecase/bid/RetrieveBid";
import TestHelper from "../TestHelper";

describe('CreateBid', () => {
    it('should create a bid', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const deal = await TestHelper.createADeal(dealRepository);
        const createBid = new CreateBid(dealRepository);
        const retrieveBid = new RetrieveBid(dealRepository);

        let input = {
            user_id: 1,
            accepted: false,
            value: 1,
            description: 'teste'
        };
        const bidCreated = await createBid.execute(deal.id, input);

        const bidFound = await retrieveBid.execute(deal.id, bidCreated.id)

        expect(bidFound.value).toBe(1)
        expect(bidFound.description).toBe('teste')


    })
})