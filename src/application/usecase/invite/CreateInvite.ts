import Invite from "../../../domain/entity/Invite";
import InputInvite from "./dto/InputInvite";
import OutputInvite from "./dto/OutputInvite";
import UserRepository from "../../repository/UserRepository";
import NotFoundError from "../../error/NotFoundErro";

export default class CreateInvite {
    constructor(readonly userRepository: UserRepository) {
    }

    async execute(userId: number, input: InputInvite): Promise<OutputInvite> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const invite = Invite.create(input.name, input.email, input.user, input.user_invited);
        user.addInvite(invite);
        await this.userRepository.updateUser(user);
        return {
            id: invite.id as number,
            name: invite.name,
            email: invite.email,
            user: invite.user,
            user_invited: invite.user_invited,
        }

    }
}