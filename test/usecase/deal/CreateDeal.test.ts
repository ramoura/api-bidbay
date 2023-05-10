import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import DealRepository from "../../../src/application/repository/DealRepository";
import CreateDeal from "../../../src/application/usecase/deal/CreateDeal";
import DealFactory from "./DealFactory";

describe('CreateDeal', () => {
    it('should create a deal', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const createDeal = new CreateDeal(dealRepository);

        let input = DealFactory.createDealForTest();

        const dealCreated = await createDeal.execute(input);

        expect(dealCreated.id).toBe(1)
        expect(dealCreated.description).toBe('description')
        expect(dealCreated.value).toBe(10)
    })
})