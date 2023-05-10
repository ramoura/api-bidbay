import Invite from "../../../domain/entity/Invite";
import UserRepository from "../../repository/UserRepository";
import NotFoundError from "../../error/NotFoundErro";

export default class RetrieveInvites {
    constructor(readonly userRepository: UserRepository) {
    }

    async execute(userId: number): Promise<Invite[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }


        const invites = user.getInvites();
        return invites.map(invite => ({
            id: invite.id,
            name: invite.name,
            email: invite.email,
            user: invite.user,
            user_invited: invite.user_invited,
        }));
    }
}