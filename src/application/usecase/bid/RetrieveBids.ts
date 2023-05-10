import DealRepository from "../../repository/DealRepository";
import Bid from "../../../domain/entity/Bid";
import OutputBid from "./dto/OutputBid";
import NotFoundError from "../../error/NotFoundErro";


export default class RetrieveBids {
    constructor(readonly dealRepository: DealRepository) {
    }

    async execute(dealId: number): Promise<OutputBid[]> {
        const deal = await this.dealRepository.findById(dealId);
        if (!deal) {
            throw new NotFoundError("Deal not found");
        }
        const bids: Bid[] = deal.getBids();

        return bids.map(bid => {
            return {
                id: bid.id as number,
                userId: bid.userId,
                accepted: bid.accepted,
                value: bid.value,
                description: bid.description
            };
        });
    }
}