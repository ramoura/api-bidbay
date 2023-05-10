import UserRepository from "../../../application/repository/UserRepository";
import User from "../../../domain/entity/User";

export default class UserRepositoryMemory implements UserRepository {
    private readonly users: User[];
    private sequence: number = 0;

    constructor() {
        this.users = [];
    }

    async saveUser(user: User): Promise<User> {
        if (user.id === undefined) {
            user.id = ++this.sequence;
            this.users.push(user);
        }
        return user;
    }

    async findByLogin(login: string): Promise<User | undefined> {
        return this.users.find((u) => u.login === login);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find((u) => u.email === email);
    }

    async updateUser(user: User): Promise<User> {
        let userIndex = this.users.findIndex((u) => u.id === user.id);
        if (userIndex >= 0) {
            this.users[userIndex] = user;
        }
        return user;
    }

    async findById(userId: number): Promise<User | undefined> {
        return this.users.find((u) => u.id === userId);
    }
}