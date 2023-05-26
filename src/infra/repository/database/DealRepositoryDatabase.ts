import DealRepository from "../../../application/repository/DealRepository";
import {Collection, Db, MongoClient} from "mongodb";
import dotenv from "dotenv";
import Deal from "../../../domain/entity/Deal";

export default class DealRepositoryDatabase implements DealRepository {
    private DEALS_COLLECTION_NAME: string = 'deals'
    private COUNTERS_COLLECTION_NAME: string = 'counters';

    private deals: Collection = undefined as any;
    private counters: Collection = undefined as any;

    constructor(readonly client: MongoClient) {
    }

    static async build(client: MongoClient): Promise<DealRepository> {
        const dealRepositoryDatabase = new DealRepositoryDatabase(client);
        await dealRepositoryDatabase.connect();
        return dealRepositoryDatabase;
    }

    async connect() {
        dotenv.config();
        if (!this.client) { // I added this extra check
            console.log('client is null')
            throw new Error('client is null');
        }
        try {
            const db: Db = this.client.db(process.env.DB_NAME);
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
        const userEntity = await this.deals.insertOne(deal);
        return deal;
    }

    async findById(dealId: number): Promise<Deal | undefined> {
        var dealDB = await this.deals.findOne(
            {id: dealId}
        );
        if (!dealDB) return undefined;
        return this.extracted(dealDB);
    }

    async update(deal: Deal): Promise<Deal> {
        const userEntity = await this.deals.findOneAndUpdate(
            {id: deal.id},
            {$set: deal}
        );
        return deal;

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