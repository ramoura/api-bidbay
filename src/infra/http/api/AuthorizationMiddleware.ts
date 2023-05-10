import TokenGenerate from "../../../domain/service/TokenGenerate";

export default class AuthorizationMiddleware {
    constructor(readonly tokenGenerator: TokenGenerate) {
    }

    public async checkAuth(req: any, res: any, next: any): Promise<void> {
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(401).send({error: "Unauthorized"});
                return;
            }
            if (token.split(" ").length !== 2) {
                res.status(401).send({error: "Unauthorized"});
                return;
            }
            const [bearer, tokenValue] = token.split(" ");
            await this.tokenGenerator.verify(tokenValue);
            next();
        } catch (error) {
            //console.log('Errro', error);
            res.status(401).send({error: "Unauthorized"});
        }
    }
}
