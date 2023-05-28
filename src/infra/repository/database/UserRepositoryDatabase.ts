import UserRepository from "../../../application/repository/UserRepository";
import User from "../../../domain/entity/User";
import {Collection, MongoClient} from "mongodb";


export default class UserRepositoryDatabase implements UserRepository {
    private USER_COLLECTION_NAME: string = 'users'
    private COUNTERS_COLLECTION_NAME: string = 'counters';

    private users: Collection = undefined as any;
    private counters: Collection = undefined as any;
    private _client: MongoClient;

    constructor(client: MongoClient = undefined as any) {
        this._client = client;
    }

    static async build(client: MongoClient): Promise<UserRepository> {
        const userRepositoryDatabase = new UserRepositoryDatabase(client);
        await userRepositoryDatabase.connect();
        return userRepositoryDatabase;
    }

    async getClient(): Promise<MongoClient> {
        if (this._client) {
            console.log("MONGODB CLIENT ALREADY CONNECTED!");
        } else {
            try {
                this._client = await MongoClient.connect(process.env.DB_CONN_STRING as string);
                await this.connect();
                console.log("MONGODB CLIENT RECONNECTED!");
            } catch (e) {
                throw e;
            }
        }
        return this._client;
    }

    async connect() {
        if (!this._client) { // I added this extra check
            console.log('client is null')
            throw new Error('client is null');
        }
        try {
            const db = this._client.db(process.env.DB_NAME);
            this.users = db.collection(this.USER_COLLECTION_NAME);
            this.counters = db.collection(this.COUNTERS_COLLECTION_NAME);
            console.log(`Successfully connected to database: ${db.databaseName} and collection: ${(await this.getUsers()).collectionName}`);
        } catch (error) {
            console.log('error during connecting to mongo: ');
            console.error(error);
        }
    }

    async findByEmail(email: string): Promise<User | undefined> {
        var userDB = await (await this.getUsers()).findOne(
            {email: email}
        );
        if (!userDB) return undefined;
        return this.extracted(userDB);
    }

    async findById(userId: number): Promise<User | undefined> {
        console.log('findById')
        var userDB = await (await this.getUsers()).findOne(
            {id: userId}
        );
        console.log('findById result:', userDB)
        if (!userDB) return undefined;
        return this.extracted(userDB);
    }

    async findByLogin(login: string): Promise<User | undefined> {
        var userDB = await (await this.getUsers()).findOne(
            {login: login}
        );
        if (!userDB) return undefined;
        return this.extracted(userDB);
    }

    async saveUser(user: User): Promise<User> {
        const id = await this.getNextSequence('userid')
        user.id = id;
        const userEntity = await (await this.getUsers()).insertOne(user);
        return user;
    }

    async updateUser(user: User): Promise<User> {
        const userEntity = await (await this.getUsers()).findOneAndUpdate(
            {id: user.id},
            {$set: user}
        );
        return user;
    }

    private async getUsers(): Promise<Collection> {
        await this.getClient();
        return this.users;
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
