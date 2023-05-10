export default class Delivery {
    constructor(readonly id: number, readonly user_id: number) {
    }

    static create(id: number, user_id: number): Delivery {
        return new Delivery(id, user_id);
    }
}