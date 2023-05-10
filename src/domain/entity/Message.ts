export default class Message {
    id: number

    constructor(
        id: number | undefined = undefined,
        readonly user_id: number,
        readonly title: string,
        readonly message: string
    ) {
        this.id = id as number;
    }

    static create(user_id: number,
                  title: string,
                  message: string): Message {
        return new Message(undefined, user_id, title, message)
    }

    static buildExistingMessage(id: number,
                                user_id: number,
                                title: string,
                                message: string) {
        return new Message(id, user_id, title, message)
    }
}