import TokenGenerate from "../../../src/domain/service/TokenGenerate";
import User from "../../../src/domain/entity/User";

describe("TokenGenerate", () => {
    it("Should generate a valid token", async () => {
        const tokenGenerate = new TokenGenerate("secret");
        const user = await User.createUser("Name Test", "123456", "email@gmail.com", "login",
            {
                city: "city",
                state: "state",
                street: "Rua Teste",
                latitude: 1,
                longitude: 1,
                zipCode: 9099999
            });

        const token = await tokenGenerate.generate(user, 100000, new Date("2023-01-01T10:00:00"));

        expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmFtZSBUZXN0IiwiZW1haWwiOiJlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NzI1NzgwMDAsImV4cCI6MTY3MjY3ODAwMH0.r1yJHctT_BWxFl_DiK87O9Da6anR1XKFkiqkwt8Xpig");
    });
});