export default class Bid {
    id: number;

    constructor(id: number | undefined,
                readonly userId: number,
                readonly accepted: boolean,
                readonly value: number,
                readonly description: string) {
        this.id = id as number;
    }

    static create(userId: number, accepted: boolean, value: number, description: string) {
        return new Bid(undefined, userId, accepted, value, description);
    }

    static buildExistingBid(id: number, userId: number, accepted: boolean, value: number, description: string) {
        return new Bid(id, userId, accepted, value, description);
    }
}