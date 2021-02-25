export interface AuthResponse {
    user: {
        id: number,
        name: string,
        email: string,
        // expires_in: number,       
    },
    isSuccess: boolean,
    token: string,
    msg: string,
}
