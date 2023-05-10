import User from "../../../src/domain/entity/User";

describe('User', () => {
    it('should create a user', async () => {
        const user = User.buildExistingUser(1,
            "Meu Nome",
            "123456",
            "salt",
            "email@email.com", "login",
            {
                city: "city",
                state: "state",
                street: "street",
                latitude: 1,
                longitude: 2,
                zipCode: 9099999
            });

        expect(user.name).toBe("Meu Nome");
        expect(user.email).toBe("email@email.com");
        expect(user.login).toBe("login");
    });
    it('should not create a user if the name is invalid', async () => {

        expect(()=> User.buildExistingUser(1,
            "Meu",
            "123456",
            "salt",
            "email@email.com", "login",
            {
                city: "city",
                state: "state",
                street: "Rua Teste",
                latitude: 1,
                longitude: 1,
                zipCode: 9099999
            })).toThrowError("Invalid name");
    })
})