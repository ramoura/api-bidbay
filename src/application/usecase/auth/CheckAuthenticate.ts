import TokenGenerate from "../../../domain/service/TokenGenerate";

export default class CheckAuthenticate {
    constructor(readonly tokenGenerate: TokenGenerate) {
    }

    async execute(token: string) {
        return this.tokenGenerate.verify(token);
    }

}