import User from "../entity/User";

export default interface TokenGenerate {

    generate(user: User, expiresIn: number, issueDate: Date): Promise<string>

    verify(token: string): Promise<any>

}