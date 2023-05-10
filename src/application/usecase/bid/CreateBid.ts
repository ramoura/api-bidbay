import DealRepository from "../../repository/DealRepository";
import Bid from "../../../domain/entity/Bid";
import InputBid from "./dto/InputBid";
import OutputBid from "./dto/OutputBid";
import NotFoundError from "../../error/NotFoundErro";

export default class CreateBid {
    constructor(readonly dealRepository: DealRepository) {
    }

    async execute(deal_id: number, input: InputBid): Promise<OutputBid> {
        const deal = await this.dealRepository.findById(deal_id);
        if (!deal) {
            throw new NotFoundError('Deal not found');
        }

        const bid = Bid.create(input.user_id, input.accepted, input.value, input.description);

        deal.addBid(bid);
        await this.dealRepository.update(deal);
        return {
            id: bid.id as number,
            userId: input.user_id,
            accepted: input.accepted,
            value: input.value,
            description: input.description
        };
    }
}