import DealRepository from "../../repository/DealRepository";
import NotFoundError from "../../error/NotFoundErro";

interface OutputDelivery {
    delivery: {
        user_id: number;
    }
    steps: string[];
}

export default class RetrieveDelivery {
    constructor(private readonly dealRepository: DealRepository) {
    }

    async execute(id: number): Promise<OutputDelivery> {
        const deal = await this.dealRepository.findById(id);

        if (!deal) {
            throw new NotFoundError("Delivery not found");
        }
        const delivery = deal.getDelivery();
        if (!delivery) {
            throw new NotFoundError("Delivery not found");
        }
        return {
            delivery: {
                user_id: delivery.user_id
            },
            steps: ["step1", "step2", "step3"]
        }
    }
}