import OutputMessage from "./dto/OutputMessage";
import DealRepository from "../../repository/DealRepository";
import NotFoundError from "../../error/NotFoundErro";

export default class RetrieveMessage {
    constructor(private dealRepository: DealRepository) {
    }

    async execute(idDeal: number, idMessage: number): Promise<OutputMessage> {
        let deal = await this.dealRepository.findById(idDeal);
        if (!deal) {
            throw new NotFoundError("Deal not found");
        }

        let message = deal.getMessage(idMessage);
        if (!message) {
            throw new NotFoundError("Message not found");
        }

        return {
            id: message.id,
            user_id: message.user_id,
            title: message.title,
            message: message.message
        };
    }
}