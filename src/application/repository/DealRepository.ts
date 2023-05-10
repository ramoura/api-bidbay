import Deal from "../../domain/entity/Deal";

export default interface DealRepository {
    create(deal: Deal): Promise<Deal>;
    update(deal: Deal): Promise<Deal>

    findById(dealId: number): Promise<Deal|undefined>


}