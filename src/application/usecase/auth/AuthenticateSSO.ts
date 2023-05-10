import SSOProviderGateway from "../../gateway/SSOProviderGateway";
import UserRepository from "../../repository/UserRepository";
import NotFoundError from "../../error/NotFoundErro";

export default class AuthenticateSSO {
    constructor(readonly ssoProvider: SSOProviderGateway, readonly userRepository: UserRepository) {
    }

    async execute(input: Input): Promise<Output> {
        const ssoUser = await this.ssoProvider.authenticate(input.tokenSSO);
        if (!ssoUser) {
            throw new Error("Authentication failed");
        }

        const user = await this.userRepository.findByEmail(ssoUser.email)
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return {
            user: {
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
            },
            token: 'jwt'
        };
    }
}

type Input = {
    login: string;
    tokenSSO: string;
}

type Output = {
    user: {
        name: string;
        login: string;
        email: string
        location: { address: string; lng: number; city: string; state: string; lat: number; zip_code: number };
    };
    token: string
}