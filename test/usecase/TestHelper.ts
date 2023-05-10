import DealRepository from "../../src/application/repository/DealRepository";
import CreateDeal from "../../src/application/usecase/deal/CreateDeal";
import DealFactory from "./deal/DealFactory";

export default class TestHelper {
    static async createADeal(dealRepository: DealRepository) {
        const createDeal = new CreateDeal(dealRepository);
        let input = DealFactory.createDealForTest();
        return await createDeal.execute(input);
    }

}