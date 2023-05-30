import User from "../../domain/entity/User";
import TokenGenerate from "../../domain/service/TokenGenerate";
import {JWT} from 'google-auth-library';

export default class TokenGenerateGoogleIdentity implements TokenGenerate {

    constructor(readonly secretKey: string) {
    }

    async generate(user: User, expiresIn: number, issueDate: Date): Promise<string> {
        const key: string = process.env.PRIVATE_KEY ?? ""
        const privateKey = key.replace(/\\n/g, '\n');

        console.log(process.env.PRIVATE_KEY)
        console.log("TokenGenerateLocal generate token for user: " + user.name + " use: " + process.env.CLIENT_EMAIL);
        console.log("TokenGenerateLocal generate token for user: " + user.name + " use: " + privateKey);

        const credentials = {
            client_email: process.env.CLIENT_EMAIL,
            private_key: privateKey,
        };

        const jwtClient = new JWT({
            email: credentials.client_email,
            key: credentials.private_key,
            scopes: ['https://www.googleapis.com/auth/service-account'],
        });

        const token = await jwtClient.authorize();

        console.log(token)

        if (!token.access_token) {
            throw new Error("TokenGenerateLocal generate")
        }
        return token.access_token;
    }

    async verify(token: string): Promise<any> {
        //throw new Error("Method not implemented.")
        console.log("TokenGenerateLocal verify")
    }

}