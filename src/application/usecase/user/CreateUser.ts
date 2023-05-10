import UserRepository from "../../repository/UserRepository";
import InputUser from "./dto/InputUser";
import OutputUser from "./dto/OutputUser";
import User from "../../../domain/entity/User";

export default class CreateUser {

    constructor(readonly userRepository: UserRepository) {
    }

    async execute(inputUser: InputUser): Promise<OutputUser> {
        const user = await User.createUser(inputUser.name, inputUser.password, inputUser.email, inputUser.login,
            {
                latitude: inputUser.location.lat,
                longitude: inputUser.location.lng,
                street: inputUser.location.address,
                city: inputUser.location.city,
                state: inputUser.location.state,
                zipCode: inputUser.location.zip_code
            });

        const userExists = await this.userRepository.findByLogin(user.login);
        if (userExists !== undefined) {
            throw new Error("User already exists");
        }


        const userSaved = await this.userRepository.saveUser(user);

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
        }


    }
}