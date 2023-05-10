import DealRepository from "../../../src/application/repository/DealRepository";
import DealRepositoryMemory from "../../../src/infra/repository/memory/DealRepositoryMemory";
import CreateDeal from "../../../src/application/usecase/deal/CreateDeal";
import RetrieveDeal from "../../../src/application/usecase/deal/RetrieveDeal";
import DealFactory from "./DealFactory";
import OutputDeal from "../../../src/application/usecase/deal/dto/OutputDeal";

describe('RetrieveDeal', () => {
    it('should return a deal', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const createDeal = new CreateDeal(dealRepository);
        const retrieveDeal = new RetrieveDeal(dealRepository);

        let input = DealFactory.createDealForTest();
        const dealSaved = await createDeal.execute(input);


        const dealRetrieve: OutputDeal = await retrieveDeal.execute(dealSaved.id);
        expect(dealRetrieve.id).toBe(1);
        expect(dealRetrieve.description).toBe('description');
        expect(dealRetrieve.value).toBe(10);
        expect(dealRetrieve.trade_for).toBe('trade_for');
        expect(dealRetrieve.location.lat).toBe(123);
        expect(dealRetrieve.location.lng).toBe(1234);
        expect(dealRetrieve.location.address).toBe('Rua');
        expect(dealRetrieve.location.city).toBe('Cidade');
        expect(dealRetrieve.location.state).toBe('Estado');
        expect(dealRetrieve.location.zip_code).toBe(123456);
        expect(dealRetrieve.urgency.type).toBe(0);
        expect(dealRetrieve.urgency.limit_date).toBeInstanceOf(Date);
        expect(dealRetrieve.photos).toStrictEqual(["photo1", "photo2"]);
    });

    it('should not return a deal with invalid id', async () => {
        const dealRepository: DealRepository = new DealRepositoryMemory();
        const retrieveDeal = new RetrieveDeal(dealRepository);

        let invalidDealId = -1;
        await expect(() => retrieveDeal.execute(invalidDealId)).rejects.toThrowError(new Error("Deal not found"));
    });
});
