import { IMenu } from "./IMenu.interface";

export interface IRestaurant {
    id?: number;
    restaurantName: string;
    openingHours: string;
    cashBalance: number;
    menu: IMenu[];
}

export interface IOpenHours {
    day: string;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
}