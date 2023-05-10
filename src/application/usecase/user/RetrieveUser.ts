import OutputUser from "./dto/OutputUser";
import UserRepository from "../../repository/UserRepository";
import NotFoundError from "../../error/NotFoundErro";

export default class RetrieveUser {
    constructor(readonly userRepository: UserRepository) {
    }

    async execute(userId: number): Promise<OutputUser> {
        let user = await this.userRepository.findById(userId);

        if (user === undefined) {
            throw new NotFoundError("User not found");
        }

        return {
            id: user.id as number,
            name: user.name,
            email: user.email,
            login: user.login,
            location: {
                lat: user.location.lat,
                lng: user.location.lng,
                address: user.location.address,
                city: user.location.city,
                state: user.location.state,
                zip_code: user.location.zip_code
            }
        };
    }
}