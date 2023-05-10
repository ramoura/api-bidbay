import DealType from "./DealType";
import UrgencyType from "./UrgencyType";
import Delivery from "./Delivery";
import Bid from "./Bid";
import Message from "./Message";

export default class Deal {
    id: number | undefined
    private delivery: Delivery | undefined;
    private bids: Bid[];
    private messages: Message[];

    constructor(id: number | undefined,
                readonly type: DealType,
                readonly value: number,
                readonly description: string,
                readonly trade_for: string,
                readonly location: {
                    lat: number;
                    lng: number;
                    address: string;
                    city: string;
                    state: string;
                    zip_code: number;
                },
                readonly urgency: {
                    type: UrgencyType;
                    limit_date: Date;
                },
                readonly photos: string[],
                delivery: Delivery | undefined = undefined,
                bids: Bid[] = [],
                messages: Message[] = []) {
        this.id = id;
        this.delivery = delivery;
        this.bids = bids;
        this.messages = messages;
    }

    static buildExistingDeal(id: number,
                             type: DealType,
                             value: number,
                             description: string,
                             trade_for: string,
                             location: {
                                 lat: number;
                                 lng: number;
                                 address: string;
                                 city: string;
                                 state: string;
                                 zip_code: number;
                             },
                             urgency: {
                                 type: UrgencyType;
                                 limit_date: Date;
                             },
                             photos: string[],
                             delivery: Delivery | undefined = undefined,
                             bids: Bid[],
                             messages: Message[]): Deal {
        return new Deal(id, type, value, description, trade_for, location, urgency, photos, delivery, bids, messages);
    }


    setDelivery(delivery: Delivery) {
        this.delivery = delivery;
    }

    getDelivery() {
        return this.delivery;
    }

    addBid(bid: Bid) {
        let lastBidId = this.bids.length > 0 ? this.bids[this.bids.length - 1].id : 0;
        if (!lastBidId) {
            lastBidId = 0
        }
        bid.id = lastBidId + 1;
        this.bids.push(bid);
    }

    getBid(bidId: number): Bid | undefined {
        return this.bids.find(bid => bid.id === bidId);
    }

    getBids() {
        return this.bids;
    }

    updateBid(bidUpdate: Bid) {
        const dealIndex = this.bids.findIndex((bid) => bid.id === bidUpdate.id);
        if (dealIndex >= 0) {
            this.bids[dealIndex] = bidUpdate;
        }
        return bidUpdate;
    }

    addMessage(message: Message): Message {
        let lastMessageId = this.messages.length > 0 ? this.messages[this.messages.length - 1].id : 0;
        if (!lastMessageId) {
            lastMessageId = 0
        }
        message.id = lastMessageId + 1;
        this.messages.push(message);
        return message;
    }

    updateMessage(messageUpdate: Message) {
        const dealIndex = this.messages.findIndex((message) => message.id === messageUpdate.id);
        if (dealIndex >= 0) {
            this.messages[dealIndex] = messageUpdate;
        }
        return messageUpdate;
    }

    getMessage(messageId: number): Message | undefined {
        return this.messages.find(message => message.id === messageId);
    }
}