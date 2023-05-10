import OutputInvite from "./dto/OutputInvite";
import UserRepository from "../../repository/UserRepository";
import NotFoundError from "../../error/NotFoundErro";

export default class RetrieveInvite {
    constructor(readonly userRepository: UserRepository) {
    }

    async execute(userId: number, inviteId: number): Promise<OutputInvite> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const invite = user.getInvite(inviteId);
        if (!invite) {
            throw new NotFoundError('Invite not found');
        }

        return {
            id: invite.id as number,
            name: invite.name,
            email: invite.email,
            user: invite.user,
            user_invited: invite.user_invited,
        };
    }
}