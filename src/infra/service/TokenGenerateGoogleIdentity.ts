import User from "../../domain/entity/User";
import TokenGenerate from "../../domain/service/TokenGenerate";
import {JWT} from 'google-auth-library';
import {sign} from "jsonwebtoken";

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

        const token = jwtClient.createScoped("887369271138-idjnnb8vs3sm35qltcjedg2udcco8gre.apps.googleusercontent.com")
        const tokenxx = await jwtClient.authorize();

        console.log(token)
        console.log(tokenxx)

        if (token.gtoken?.rawToken) {
            throw new Error("TokenGenerateLocal generate")
        }
        return this.generate2(user, expiresIn, issueDate);
    }

    async generate2(user: User, expiresIn: number, issueDate: Date): Promise<string> {
        const key: string = process.env.PRIVATE_KEY ?? ""
        const privateKey = key.replace(/\\n/g, '\n');


        console.log(process.env.PRIVATE_KEY)
        console.log("TokenGenerateLocal generate token for user: " + user.name + " use: " + process.env.CLIENT_EMAIL);
        console.log("TokenGenerateLocal generate token for user: " + user.name + " use: " + privateKey);

        return sign({
                aud: "887369271138-idjnnb8vs3sm35qltcjedg2udcco8gre.apps.googleusercontent.com",
                iss: "https://accounts.google.com",
                email: process.env.CLIENT_EMAIL,
                azp: process.env.CLIENT_EMAIL,
                email_verified: true,
                scopes: ['https://www.googleapis.com/auth/service-account'],
                name: user.name,
                //email: user.email,
                iat: Math.floor(issueDate.getTime() / 1000)
            },
            privateKey,
            {
                expiresIn: expiresIn,
                algorithm: 'RS256'
            }
        );
    }

    async verify(token: string): Promise<any> {
        //throw new Error("Method not implemented.")
        console.log("TokenGenerateLocal verify: ", token)
    }

}