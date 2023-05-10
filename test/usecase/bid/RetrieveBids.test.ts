import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import CreateBid from "../../../src/application/usecase/bid/CreateBid";
import RetrieveBids from "../../../src/application/usecase/bid/RetrieveBids";
import TestHelper from "../TestHelper";


describe('RetrieveBids', () => {
    it('should create a bid', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const createBid = new CreateBid(dealRepository);
        const retrieveBids = new RetrieveBids(dealRepository);
        const deal = await TestHelper.createADeal(dealRepository);

        let input = {
            user_id: 1,
            accepted: false,
            value: 1,
            description: 'teste'
        };
        await createBid.execute(deal.id, input);
        await createBid.execute(deal.id, input);

        const bidFound = await retrieveBids.execute(deal.id)

        expect(bidFound).toHaveLength(2)

    })
    it('should not find bids', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const retrieveBids = new RetrieveBids(dealRepository);
        const deal = await TestHelper.createADeal(dealRepository);

        const bidFound = await retrieveBids.execute(deal.id)

        expect(bidFound).toHaveLength(0)

    })
})