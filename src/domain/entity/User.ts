import Location from "./Location";
import Password from "./Password";
import Invite from "./Invite";

export default class User {
    id: number | undefined
    private invites: Invite[];

    private constructor(
        id: number | undefined,
        readonly name: string,
        readonly password: Password,
        readonly email: string,
        readonly login: string,
        readonly location: Location,
        invites?: Invite[]) {
        if (!name || name.split(" ").length < 2) {
            throw new Error("Invalid name");
        }
        this.id = id;
        this.invites = invites || [];
    }

    static async createUser(name: string,
                            password: string,
                            email: string,
                            login: string,
                            location: {
                                city: string;
                                street: string;
                                latitude: number;
                                state: string;
                                longitude: number;
                                zipCode: number;
                            }
    ): Promise<User> {

        return new User(undefined,
            name,
            await Password.create(password),
            email,
            login,
            new Location(location.latitude, location.longitude, location.street, location.city, location.state, location.zipCode));
    }

    static buildExistingUser(id: number,
                             name: string,
                             hashPassword: string,
                             salt: string,
                             email: string,
                             login: string,
                             location: {
                                 city: string;
                                 street: string;
                                 latitude: number;
                                 state: string;
                                 longitude: number;
                                 zipCode: number;
                             },
                             invites?: Invite[]) {
        return new User(id, name, new Password(hashPassword, salt), email, login, new Location(location.latitude, location.longitude, location.street, location.city, location.state, location.zipCode), invites);
    }

    async validatePassword(password: string): Promise<boolean> {
        return this.password.validate(password);
    }

    getInvite(inviteId: number): Invite | undefined {
        this.invites.forEach(invite => console.log(invite.id))
        return this.invites.find(invite => {
            return invite.id == inviteId
        });
    }

    addInvite(invite: Invite) {
        let lastUserId = this.invites.length > 0 ? this.invites[this.invites.length - 1].id : 0;
        if (!lastUserId) {
            lastUserId = 0
        }
        invite.id = lastUserId + 1;

        this.invites.push(invite);
    }

    getInvites() {
        return this.invites;
    }

    updateInvite(inviteUpdated: Invite): Invite {
        const inviteIndex = this.invites.findIndex((invite) => invite.id === inviteUpdated.id);
        if (inviteIndex >= 0) {
            this.invites[inviteIndex] = inviteUpdated;
        }
        return inviteUpdated;
    }
}