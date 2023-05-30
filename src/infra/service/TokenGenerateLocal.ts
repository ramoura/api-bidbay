import {sign, verify} from "jsonwebtoken";
import User from "../../domain/entity/User";
import TokenGenerate from "../../domain/service/TokenGenerate";


export default class TokenGenerateLocal implements TokenGenerate {

    constructor(readonly secretKey: string) {
    }

    async generate(user: User, expiresIn: number, issueDate: Date): Promise<string> {
        return sign({
                name: user.name,
                email: user.email,
                iat: Math.floor(issueDate.getTime() / 1000)
            },
            this.secretKey,
            {
                expiresIn: expiresIn
            }
        );
    }

    async verify(token: string): Promise<any> {
        return verify(token, this.secretKey);
    }

}