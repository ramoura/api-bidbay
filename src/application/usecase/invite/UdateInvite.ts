import Invite from "../../../domain/entity/Invite";
import InputInvite from "./dto/InputInvite";
import OutputInvite from "./dto/OutputInvite";
import UserRepository from "../../repository/UserRepository";
import NotFoundError from "../../error/NotFoundErro";

export default class UpdateInvite {
    constructor(readonly userRepository: UserRepository) {
    }

    async execute(userId: number, inviteID: number, input: InputInvite): Promise<OutputInvite> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const invite = user.getInvite(inviteID);
        if (!invite) {
            throw new NotFoundError('Invite not found')
        }

        const inviteUpdated = Invite.buildExistingInvite(invite.id, input.name, input.email, input.user, input.user_invited);
        user.updateInvite(inviteUpdated);
        await this.userRepository.updateUser(user)
        return {
            id: inviteUpdated.id as number,
            name: inviteUpdated.name,
            email: inviteUpdated.email,
            user: inviteUpdated.user,
            user_invited: inviteUpdated.user_invited,
        }

    }
}