import User from "../../domain/entity/User";

export default interface UserRepository {
    saveUser(user: User): Promise<User>
    updateUser(user: User): Promise<User>
    findById(userId: number): Promise<User|undefined>
    findByLogin(login: string): Promise<User|undefined>

    findByEmail(email: string): Promise<User|undefined>;
}