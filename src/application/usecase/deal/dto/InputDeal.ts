import DealType from "../../../../domain/entity/DealType";
import UrgencyType from "../../../../domain/entity/UrgencyType";

export default interface InputDeal {
    type: DealType;
    value: number;
    description: string;
    trade_for: string;
    location: {
        lat: number;
        lng: number;
        address: string;
        city: string;
        state: string;
        zip_code: number;
    }
    urgency: {
        type: UrgencyType;
        limit_date: Date;
    },
    photos: string[];
}