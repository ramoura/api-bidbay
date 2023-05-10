import Bid from "../../../domain/entity/Bid";
import OutputBid from "./dto/OutputBid";
import DealRepository from "../../repository/DealRepository";
import InputBid from "./dto/InputBid";
import NotFoundError from "../../error/NotFoundErro";


export default class UpdateBid {
    constructor(readonly dealRepository: DealRepository) {
        this.dealRepository = dealRepository;
    }

    async execute(deal_id: number, bid_id: number, input: InputBid): Promise<OutputBid> {
        const deal = await this.dealRepository.findById(deal_id);
        if (!deal) {
            throw new NotFoundError("Deal not found");
        }

        const bid = deal.getBid(bid_id)
        if (!bid) {
            throw new NotFoundError("Bid not found");
        }

        const bidUpdate = Bid.buildExistingBid(bid.id, input.user_id, input.accepted, input.value, input.description)
        deal.updateBid(bidUpdate);
        await this.dealRepository.update(deal);
        return {
            id: bidUpdate.id as number,
            userId: input.user_id,
            accepted: input.accepted,
            value: input.value,
            description: input.description
        }
    }
}