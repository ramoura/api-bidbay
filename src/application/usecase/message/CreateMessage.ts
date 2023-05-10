import Message from "../../../domain/entity/Message";
import UserRepository from "../../repository/UserRepository";
import InputMessage from "./dto/InputMessage";
import OutputMessage from "./dto/OutputMessage";
import DealRepository from "../../repository/DealRepository";
import NotFoundError from "../../error/NotFoundErro";


export default class CreateMessage {
    constructor(readonly userRepository: UserRepository, readonly dealRepository: DealRepository) {
    }

    async execute(dealId: number, input: InputMessage): Promise<OutputMessage> {
        const deal = await this.dealRepository.findById(dealId);
        if (!deal) {
            throw new NotFoundError("Deal not found");
        }

        const user = await this.userRepository.findById(input.user_id);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const message = Message.create(input.user_id, input.title, input.message);
        const messageCreated = deal.addMessage(message);
        await this.dealRepository.update(deal);
        return {
            id: messageCreated.id,
            user_id: messageCreated.user_id,
            title: messageCreated.title,
            message: messageCreated.message
        };
    }
}