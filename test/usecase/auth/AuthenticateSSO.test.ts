import AuthenticateSSO from "../../../src/application/usecase/auth/AuthenticateSSO";
import UserRepositoryMemory from "../../../src/infra/repository/memory/UserRepositoryMemory";
import SSOProviderGateway from "../../../src/application/gateway/SSOProviderGateway";
import UserFactory from "../user/UserFactory";
import CreateUser from "../../../src/application/usecase/user/CreateUser";

describe('AuthenticateSSO', () => {
    let input = {
        login: 'test',
        tokenSSO: "token"
    };
    it('should authenticate user', async () => {
        const userRepository = new UserRepositoryMemory()
        const createUser = new CreateUser(userRepository);
        const ssoProvider: SSOProviderGateway = {
            authenticate: jest.fn().mockResolvedValue({
                name: 'test',
                email: 'email@email.com'
            })
        }

        const user = UserFactory.createUserForTest("valid_login", "valid_password");
        await createUser.execute(user);

        const authSSO = new AuthenticateSSO(ssoProvider, userRepository)

        const output = await authSSO.execute(input);

        expect(output.user).toBeDefined();
        expect(output.user.login).toBe('valid_login');
        expect(output.user.name).toBe('Name Test');
    });
    it('should not authenticate user with invalid login', async () => {
        const userRepository = new UserRepositoryMemory()
        const ssoProvider: SSOProviderGateway = {
            authenticate: jest.fn().mockResolvedValue(undefined)
        }

        const authSSO = new AuthenticateSSO(ssoProvider, userRepository)

        await expect(() => authSSO.execute(input)).rejects.toThrowError("Authentication failed")

    });
    it('should not authenticate if user not found', async () => {
        const userRepository = new UserRepositoryMemory()
        const ssoProvider: SSOProviderGateway = {
            authenticate: jest.fn().mockResolvedValue({
                name: 'test',
                email: 'email@email.com'
            })
        }

        const authSSO = new AuthenticateSSO(ssoProvider, userRepository)

        await expect(() => authSSO.execute(input)).rejects.toThrowError("User not found")


    })


});