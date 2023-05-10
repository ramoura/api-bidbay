import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import CreateDeal from "../../../src/application/usecase/deal/CreateDeal";
import DealFactory from "./DealFactory";
import UpdateDeal from "../../../src/application/usecase/deal/UpdateDeal";

describe('UpdateDeal', () => {
    it('should update a deal', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const createDeal = new CreateDeal(dealRepository);
        const updateDeal = new UpdateDeal(dealRepository);

        let input = DealFactory.createDealForTest();

        const dealCreated = await createDeal.execute(input);

        input.description = 'description updated'
        input.value = 20

        const dealUpdated = await updateDeal.execute(dealCreated.id, input);

        expect(dealUpdated.id).toBe(1)
        expect(dealUpdated.description).toBe('description updated')
        expect(dealUpdated.value).toBe(20)
        expect(dealUpdated.trade_for).toBe('trade_for')
    })
    it('should not update a deal if deal not found', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const updateDeal = new UpdateDeal(dealRepository);

        let input = DealFactory.createDealForTest();
        const dealId = -1;

        await expect(() => updateDeal.execute(dealId, input)).rejects.toThrowError(new Error('Deal not found'));
    })
})