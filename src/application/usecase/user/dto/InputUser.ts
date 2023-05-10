export default interface InputUser {
    name: string;
    email: string;
    login: string;
    password: string;
    location: {
        lat: number;
        lng: number;
        address: string;
        city: string;
        state: string;
        zip_code: number;
    }
}