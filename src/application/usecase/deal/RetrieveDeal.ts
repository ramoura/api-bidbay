import DealRepository from "../../repository/DealRepository";
import OutputDeal from "./dto/OutputDeal";
import NotFoundError from "../../error/NotFoundErro";

export default class RetrieveDeal {
    constructor(readonly dealRepository: DealRepository) {
    }

    async execute(dealId: number): Promise<OutputDeal> {
        const deal = await this.dealRepository.findById(dealId);

        if (!deal) {
            throw new NotFoundError("Deal not found");
        }

        return {
            id: deal.id as number,
            type: deal.type,
            value: deal.value,
            description: deal.description,
            trade_for: deal.trade_for,
            location: {
                lat: deal.location.lat,
                lng: deal.location.lng,
                address: deal.location.address,
                city: deal.location.city,
                state: deal.location.state,
                zip_code: deal.location.zip_code
            },
            urgency: {
                type: deal.urgency.type,
                limit_date: deal.urgency.limit_date
            },
            photos: deal.photos
        }
    }
}
