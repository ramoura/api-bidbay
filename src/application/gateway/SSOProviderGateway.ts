export default interface SSOProviderGateway {
    authenticate(tokenSSO: string): Promise<SSOUser>;
}

export type SSOUser = {
    name: string;
    email: string;
}