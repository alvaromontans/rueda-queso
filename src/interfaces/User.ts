export interface User {
    username: string,
    status?: string,
    position: { latitude: number, longitude: number },
    address: string,
    error?: string
}