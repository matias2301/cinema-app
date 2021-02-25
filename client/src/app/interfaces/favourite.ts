export interface Favourite {   
    title: string;
    overview: string;
    vote_average: number;    
    release_date: Date;
    customImg?: string;
}
export interface FavResponse {
    favourites: Favourite[],
    isSuccess: boolean,
    msg: string,
}