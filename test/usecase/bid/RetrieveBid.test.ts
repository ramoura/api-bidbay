import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import CreateBid from "../../../src/application/usecase/bid/CreateBid";
import RetrieveBid from "../../../src/application/usecase/bid/RetrieveBid";
import TestHelper from "../TestHelper";

describe('RetrieveBid', () => {
    it('should retrieve a bid', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const createBid = new CreateBid(dealRepository);
        const retrieveBid = new RetrieveBid(dealRepository);
        const deal = await TestHelper.createADeal(dealRepository);

        let input = {
            user_id: 1,
            accepted: false,
            value: 1,
            description: 'teste'
        };
        const bid = await createBid.execute(deal.id, input);

        const bidFound = await retrieveBid.execute(deal.id, bid.id)

        expect(bidFound.description).toBe("teste")

    })
    it('should not find a bid', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const retrieveBid = new RetrieveBid(dealRepository);
        const deal = await TestHelper.createADeal(dealRepository);
        await expect(() => retrieveBid.execute(deal.id, 1)).rejects.toThrowError(new Error("Bid not found"));
    })
})