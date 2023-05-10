import DealRepository from "../../repository/DealRepository";
import Deal from "../../../domain/entity/Deal";
import InputDeal from "./dto/InputDeal";
import NotFoundError from "../../error/NotFoundErro";

export default class UpdateDeal {
    constructor(readonly dealRepository: DealRepository) {
    }

    async execute(id: number, input: InputDeal) {
        const dealFound = await this.dealRepository.findById(id);
        if (!dealFound) {
            throw new NotFoundError('Deal not found');
        }
        const deal = new Deal(dealFound.id, input.type, input.value, input.description, input.trade_for, input.location, input.urgency, input.photos);

        const dealUpdated = await this.dealRepository.update(deal);

        return {
            id: dealUpdated.id as number,
            type: input.type,
            value: input.value,
            description: input.description,
            trade_for: input.trade_for,
            location: {
                lat: input.location.lat,
                lng: input.location.lng,
                address: input.location.address,
                city: input.location.city,
                state: input.location.state,
                zip_code: input.location.zip_code
            },
            urgency: input.urgency,
            photos: input.photos
        }

    }
}