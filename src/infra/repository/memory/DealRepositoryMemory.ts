import Deal from "../../../domain/entity/Deal";
import DealRepository from "../../../application/repository/DealRepository";

export default class DealRepositoryMemory implements DealRepository {
    private deals: Deal[] = [];
    private sequence: number = 0;
    public async create(deal: Deal): Promise<Deal> {

        if(deal.id === undefined) {
            deal.id = ++this.sequence;
            this.deals.push(deal);
        }
        return deal;
    }

    async findById(dealId: number): Promise<Deal | undefined> {
        return this.deals.find((deal) => deal.id === dealId);
    }

    async update(deal: Deal): Promise<Deal> {
        const dealIndex = this.deals.findIndex((deal) => deal.id === deal.id);
        if(dealIndex >= 0) {
            this.deals[dealIndex] = deal;
        }
        return deal;
    }

}