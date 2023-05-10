import DealRepository from "../../repository/DealRepository";
import Deal from "../../../domain/entity/Deal";
import InputDeal from "./dto/InputDeal";
import OutputDeal from "./dto/OutputDeal";

export default class CreateDeal {
    constructor(readonly dealRepository: DealRepository) {
    }
    async execute(input: InputDeal): Promise<OutputDeal> {

        const deal = new Deal(undefined, input.type, input.value, input.description, input.trade_for, input.location, input.urgency, input.photos);

        const dealSaved = await this.dealRepository.create(deal);
        return {
            id: dealSaved.id as number,
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
