export default interface OutputUser {
    id: number;
    name: string;
    email: string;
    login: string;
    location: {
        lat: number;
        lng: number;
        address: string;
        city: string;
        state: string;
        zip_code: number;
    }
}
