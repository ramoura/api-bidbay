import Delivery from "../../../domain/entity/Delivery";
import DealRepository from "../../repository/DealRepository";
import NotFoundError from "../../error/NotFoundErro";

interface OutputDelivery {
    user_id: number;
}

interface InputDelivery {
    user_id: number;
}

export default class CreateDelivery {
    constructor(readonly dealRepository: DealRepository) {
    }

    async execute(dealId: number, input: InputDelivery): Promise<OutputDelivery> {
        const delivery = new Delivery(1, input.user_id)
        const deal = await this.dealRepository.findById(dealId);
        if (!deal) {
            throw new NotFoundError('Deal not found ');
        }
        deal.setDelivery(delivery);
        await this.dealRepository.update(deal);

        return {
            user_id: delivery.user_id
        }

    }

}