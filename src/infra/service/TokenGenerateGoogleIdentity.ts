import User from "../../domain/entity/User";
import TokenGenerate from "../../domain/service/TokenGenerate";
import {JWT} from 'google-auth-library';

export default class TokenGenerateGoogleIdentity implements TokenGenerate {

    constructor(readonly secretKey: string) {
    }

    async generate(user: User, expiresIn: number, issueDate: Date): Promise<string> {
        const key: string = process.env.PRIVATE_KEY ?? ""
        const privateKey = key.replace(/\\n/g, '\n');

        const credentials = {
            client_email: process.env.CLIENT_EMAIL,
            private_key: privateKey,
        };

        const jwtClient = new JWT({
            email: credentials.client_email,
            key: credentials.private_key,
            scopes: ['887369271138-idjnnb8vs3sm35qltcjedg2udcco8gre.apps.googleusercontent.com'],
        });

        const authorize = await jwtClient.authorize();
        return authorize.id_token ?? "";
    }

    async verify(token: string): Promise<any> {
        //throw new Error("Method not implemented.")
        console.log("TokenGenerateLocal verify: ", token)
    }

}