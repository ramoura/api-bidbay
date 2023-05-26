import UserRepository from "../../../application/repository/UserRepository";
import User from "../../../domain/entity/User";
import {Collection, MongoClient} from "mongodb";
import dotenv from "dotenv";


export default class UserRepositoryDatabase implements UserRepository {
    private USER_COLLECTION_NAME: string = 'users'
    private COUNTERS_COLLECTION_NAME: string = 'counters';

    private users: Collection = undefined as any;
    private counters: Collection = undefined as any;

    constructor(readonly client: MongoClient) {
    }

    static async build(client: MongoClient): Promise<UserRepository> {
        const userRepositoryDatabase = new UserRepositoryDatabase(client);
        await userRepositoryDatabase.connect();
        return userRepositoryDatabase;
    }


    async connect() {
        dotenv.config();
        if (!this.client) { // I added this extra check
            console.log('client is null')
            throw new Error('client is null');
        }
        try {
            const db = this.client.db(process.env.DB_NAME);
            this.users = db.collection(this.USER_COLLECTION_NAME);
            this.counters = db.collection(this.COUNTERS_COLLECTION_NAME);
            console.log(`Successfully connected to database: ${db.databaseName} and collection: ${this.users.collectionName}`);
        } catch (error) {
            console.log('error during connecting to mongo: ');
            console.error(error);
        }
    }

    async findByEmail(email: string): Promise<User | undefined> {
        var userDB = await this.users.findOne(
            {email: email}
        );
        if (!userDB) return undefined;
        return this.extracted(userDB);
    }

    async findById(userId: number): Promise<User | undefined> {
        console.log('findById')
        var userDB = await this.users.findOne(
            {id: userId}
        );
        console.log('findById result:', userDB)
        if (!userDB) return undefined;
        return this.extracted(userDB);
    }

    async findByLogin(login: string): Promise<User | undefined> {
        var userDB = await this.users.findOne(
            {login: login}
        );
        if (!userDB) return undefined;
        return this.extracted(userDB);
    }

    async saveUser(user: User): Promise<User> {
        const id = await this.getNextSequence('userid')
        user.id = id;
        const userEntity = await this.users.insertOne(user);
        return user;
    }

    async updateUser(user: User): Promise<User> {
        const userEntity = await this.users.findOneAndUpdate(
            {id: user.id},
            {$set: user}
        );
        return user;
    }

    private extracted(userDB: any) {
        return User.buildExistingUser(
            userDB.id,
            userDB.name,
            userDB.password._value,
            userDB.password._salt,
            userDB.email,
            userDB.login,
            {
                city: userDB.location.city,
                street: userDB.location.address,
                latitude: userDB.location.lat,
                state: userDB.location.state,
                longitude: userDB.location.lng,
                zipCode: userDB.location.zip_code
            },
            userDB.invites);
    }

    private async getNextSequence(name: any): Promise<number> {
        var ret = await this.counters.findOneAndUpdate(
            {_id: name},
            {$inc: {seq: 1}}
        );
        if (ret.value === null) {
            await this.counters.insertOne({_id: name, seq: 1});
            return 0;
        }
        return ret.value.seq;
    }

}
