import UserRepository from "../../repository/UserRepository";
import TokenGenerate from "../../../domain/service/TokenGenerate";
import NotFoundError from "../../error/NotFoundErro";

export default class AuthenticateUser {
    private EXPIRES_IN_TWO_HOURS: number = 60 * 60 * 2;

    constructor(readonly userRepository: UserRepository, readonly tokenGenerate: TokenGenerate) {
    }

    async execute(input: Input): Promise<Output> {
        const user = await this.userRepository.findByLogin(input.login);
        if (!user) throw new NotFoundError("User not found");
        const isValidPassword = await user.validatePassword(input.password)
        if (!isValidPassword) {
            throw new Error("Authentication failed");
        }
        const token = await this.tokenGenerate.generate(user, this.EXPIRES_IN_TWO_HOURS, new Date());
        return {
            token: token,
            user: {
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
            }
        }
    }
}

type Input = {
    login: string;
    password: string;
}

type OutputUser = {
    id: number;
    name: string;
    login: string;
    email: string
    location: {
        address: string;
        lng: number;
        city: string;
        state: string;
        lat: number;
        zip_code: number
    };
}
type Output = {
    token: string;
    user: OutputUser;
}