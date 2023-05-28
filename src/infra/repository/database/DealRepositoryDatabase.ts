import DealRepository from "../../../application/repository/DealRepository";
import {Collection, Db, MongoClient} from "mongodb";
import Deal from "../../../domain/entity/Deal";

export default class DealRepositoryDatabase implements DealRepository {
    private DEALS_COLLECTION_NAME: string = 'deals'
    private COUNTERS_COLLECTION_NAME: string = 'counters';

    private deals: Collection = undefined as any;
    private counters: Collection = undefined as any;

    private _client: MongoClient;

    constructor(client: MongoClient = undefined as any) {
        this._client = client;
    }

    static async build(client: MongoClient): Promise<DealRepository> {
        const dealRepositoryDatabase = new DealRepositoryDatabase(client);
        await dealRepositoryDatabase.connect();
        return dealRepositoryDatabase;
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
            const db: Db = this._client.db(process.env.DB_NAME);
            this.deals = db.collection(this.DEALS_COLLECTION_NAME);
            this.counters = db.collection(this.COUNTERS_COLLECTION_NAME);
            console.log(`Successfully connected to database: ${db.databaseName} and collection: ${this.deals.collectionName}`);
        } catch (error) {
            console.log('error during connecting to mongo: ');
            console.error(error);
        }
    }

    async create(deal: Deal): Promise<Deal> {
        const id = await this.getNextSequence('dealid')
        deal.id = id;
        const userEntity = await (await this.getDeals()).insertOne(deal);
        return deal;
    }

    async findById(dealId: number): Promise<Deal | undefined> {
        var dealDB = await (await this.getDeals()).findOne(
            {id: dealId}
        );
        if (!dealDB) return undefined;
        return this.extracted(dealDB);
    }

    async update(deal: Deal): Promise<Deal> {
        const userEntity = await (await this.getDeals()).findOneAndUpdate(
            {id: deal.id},
            {$set: deal}
        );
        return deal;

    }

    private async getDeals(): Promise<Collection> {
        await this.getClient();
        return this.deals;
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

    private extracted(dealDB: any) {
        return Deal.buildExistingDeal(
            dealDB.id,
            dealDB.type,
            dealDB.value,
            dealDB.description,
            dealDB.trade_for,
            dealDB.location,
            dealDB.urgency,
            dealDB.photos,
            dealDB.delivery,
            dealDB.bids,
            dealDB.messages
        );
    }
}