import UserRepository from "../../repository/UserRepository";
import InputUser from "./dto/InputUser";
import OutputUser from "./dto/OutputUser";
import User from "../../../domain/entity/User";
import NotFoundError from "../../error/NotFoundErro";

export default class UpdateUser {
    constructor(readonly userRepository: UserRepository) {
    }

    async execute(userId: number, inputUser: InputUser): Promise<OutputUser> {

        const user = User.buildExistingUser(userId, inputUser.name, inputUser.password, inputUser.password, inputUser.email, inputUser.login, {
            latitude: inputUser.location.lat,
            longitude: inputUser.location.lng,
            street: inputUser.location.address,
            city: inputUser.location.city,
            state: inputUser.location.state,
            zipCode: inputUser.location.zip_code
        });
        const userFound = await this.userRepository.findById(userId);
        if (userFound === undefined) {
            throw new NotFoundError("User not found");
        }

        const userSaved = await this.userRepository.updateUser(user);

        return {
            id: userSaved.id as number,
            name: userSaved.name,
            email: userSaved.email,
            login: userSaved.login,
            location: {
                lat: userSaved.location.lat,
                lng: userSaved.location.lng,
                address: userSaved.location.address,
                city: userSaved.location.city,
                state: userSaved.location.state,
                zip_code: userSaved.location.zip_code
            }
        };
    }
}