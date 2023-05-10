import {pbkdf2, randomBytes} from "crypto";

export default class Password {
    constructor(
        private readonly _value: string,
        private readonly _salt: string
    ) {
    }

    get value(): string {
        return this._value;
    }

    get salt(): string {
        return this._salt;
    }

    static async create(value: string, salt?: string): Promise<Password> {
        const valueParam = value || "";
        if (valueParam === "") throw new Error("Value must not be empty");

        const saltGenerated = salt || randomBytes(20).toString("hex");
        return new Promise((resolve, reject) => {
            pbkdf2(value, saltGenerated, 1000, 64, "sha512", (err, value) => {
                if (err) reject(err);
                resolve(new Password(value.toString("hex"), saltGenerated));
            });
        });
    }

    async validate(planPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            pbkdf2(planPassword, this.salt, 1000, 64, "sha512", (err, value) => {
                if (err) reject(err);
                resolve(value.toString("hex") === this.value);
            });
        });

    }
}