import DealRepository from "../../repository/DealRepository";
import OutputBid from "./dto/OutputBid";
import NotFoundError from "../../error/NotFoundErro";


export default class RetrieveBid {
    constructor(readonly dealRepository: DealRepository) {
    }

    async execute(dealId: number, bidId: number): Promise<OutputBid> {
        const deal = await this.dealRepository.findById(dealId);
        if (!deal) {
            throw new NotFoundError("Deal not found");
        }

        const bid = deal.getBid(bidId);
        if (!bid) {
            throw new NotFoundError("Bid not found");
        }
        return {
            id: bid.id as number,
            userId: bid.userId,
            accepted: bid.accepted,
            value: bid.value,
            description: bid.description
        }
    }
}