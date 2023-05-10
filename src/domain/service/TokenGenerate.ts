import {sign, verify} from "jsonwebtoken";
import User from "../entity/User";

export default class TokenGenerate {

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