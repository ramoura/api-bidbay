import Password from "../../../src/domain/entity/Password";


describe("Password", () => {
    it("Should create a valid password", async () => {
        const password = await Password.create("valid_password", "salt");
        expect(password.value).toBe("8d20ea73a6e6a884b2de2f068d259702b33d692dc2003a0be00b38f626adfeece233fa1ae54f4730360647b7c8b55d8236598b766b6b34be724fa476778df6dd");
        expect(password.salt).toBe("salt");
    });

    it("Should create a password with generated salt", async () => {
        const password = await Password.create("valid_password");
        expect(password.value).not.toBeNull();
        expect(password.value).not.toBe("valid_password");
        expect(password.salt).not.toBeNull();
    });

    it("Should not create a password with invalid value", async () => {
        await expect(() => Password.create("", "salt")).rejects.toThrowError(new Error("Value must not be empty"));
    });

    it("Should not create a password with invalid salt and value", async () => {
        await expect(() => Password.create("", "")).rejects.toThrowError("Value must not be empty");
    });
});
