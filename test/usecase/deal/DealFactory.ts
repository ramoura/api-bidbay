import InputDeal from "../../../src/application/usecase/deal/dto/InputDeal";

export default class DealFactory {

    static createDealForTest(): InputDeal {
        return {
            type: 0,
            value: 10,
            description: "description",
            trade_for: "trade_for",
            location:
                {
                    lat: 123,
                    lng: 1234,
                    address: "Rua",
                    city: "Cidade",
                    state: "Estado",
                    zip_code: 123456
                },
            urgency:{
                type: 0,
                limit_date: new Date()
            },
            photos: ["photo1", "photo2"]
        };
    }
}