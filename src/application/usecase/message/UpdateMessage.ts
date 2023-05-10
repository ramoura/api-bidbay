import OutputMessage from "./dto/OutputMessage";
import Message from "../../../domain/entity/Message";
import InputMessage from "./dto/InputMessage";
import DealRepository from "../../repository/DealRepository";
import NotFoundError from "../../error/NotFoundErro";

export default class UpdateMessage {
    constructor(readonly dealRepository: DealRepository) {
    }

    async execute(dealId: number, messageId: number, input: InputMessage): Promise<OutputMessage> {

        let deal = await this.dealRepository.findById(dealId);
        if (!deal) {
            throw new NotFoundError("Deal not found");
        }

        let messageFound = deal.getMessage(messageId);
        if (!messageFound) {
            throw new NotFoundError("Message not found");
        }
        const messageUpdated = Message.buildExistingMessage(messageFound.id, input.user_id, input.title, input.message);

        deal.updateMessage(messageUpdated);
        await this.dealRepository.update(deal);

        return {
            id: messageUpdated.id,
            user_id: messageUpdated.user_id,
            title: messageUpdated.title,
            message: messageUpdated.message
        };
    }
}