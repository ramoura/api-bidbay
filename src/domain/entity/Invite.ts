export default class Invite {
    id: number;

    constructor(
        id: number | undefined = undefined,
        readonly name: string,
        readonly email: string,
        readonly user: number,
        readonly user_invited: number
    ) {
        this.id = id as number;
    }

    static create(name: string,
                  email: string,
                  user: number,
                  user_invited: number) {
        return new Invite(undefined, name, email, user, user_invited);
    }

    static buildExistingInvite(id: number,
                               name: string,
                               email: string,
                               user: number,
                               user_invited: number) {
        return new Invite(id, name, email, user, user_invited);
    }


}