import InputUser from "../../../src/application/usecase/user/dto/InputUser";

export default class UserFactory {

    static createUserForTest(login: string = "email@email.com", password: string = "123456"): InputUser {
        return {
            name: "Name Test",
            email: "email@email.com",
            login,
            password,
            location:
                {
                    lat: 123,
                    lng: 1234,
                    address: "Rua",
                    city: "Cidade",
                    state: "Estado",
                    zip_code: 123456
                }
        };
    }

}