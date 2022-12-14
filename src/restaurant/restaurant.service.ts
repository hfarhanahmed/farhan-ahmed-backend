import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ENTITY_NAMES } from '../constants';
import { IOpenHours } from '../interface/IRestaurant.interface';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { SuccessResponse } from '../interface/SuccessResponse.interface';
import { RestaurantDto } from 'src/dto/restaurant.dto';
@Injectable()
export class RestaurantService {
    constructor(@InjectRepository(Restaurant) private readonly restaurantRepository: Repository<Restaurant>) { }

    async getRestaurants(options: IPaginationOptions, date: string): Promise<Pagination<Restaurant>> {
        const dayNames = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
        let dateTime = new Date(date);
        const dayOfWeek = dateTime.getDay();
        const restaurantsQuery = this.restaurantRepository
            .createQueryBuilder(ENTITY_NAMES.RESTAURANT)
            .leftJoin('restaurant.openingHours', 'openingHours')
            .leftJoinAndSelect('restaurant.menu', 'menu')
            .where("openingHours.day = :day", { day: dayNames[dayOfWeek] })
            .andWhere("openingHours.startTime <= :time", { time: `${dateTime.getHours()}:${dateTime.getMinutes()}` })
            .andWhere("openingHours.endTime >= :time", { time: `${dateTime.getHours()}:${dateTime.getMinutes()}` });

        return paginate<Restaurant>(restaurantsQuery, options);
    }

    async searchRestaurants(options: IPaginationOptions, isRestaurant: boolean, searchKey: string): Promise<Pagination<Restaurant>> {
        const restaurantsQuery = this.restaurantRepository
            .createQueryBuilder(ENTITY_NAMES.RESTAURANT)
            .leftJoinAndSelect('restaurant.menu', 'menu');
        if (isRestaurant) {
            restaurantsQuery.where("restaurant.restaurantName like :key", { key: `%${searchKey}%` });
        } else {
            restaurantsQuery.where("menu.dishName like :key", { key: `%${searchKey}%` });
        }

        return paginate<Restaurant>(restaurantsQuery, options);
    }

    async filterRestaurants(options: IPaginationOptions, dishes: number, isLess: boolean, minPrice: number, maxPrice: number): Promise<Pagination<Restaurant>> {
        const restaurantsQuery = this.restaurantRepository.createQueryBuilder(ENTITY_NAMES.RESTAURANT);
        restaurantsQuery.leftJoinAndSelect('restaurant.menu', 'menu')
            .groupBy('menu.id')
            .andWhere("menu.price BETWEEN :min and :max", { min: minPrice, max: maxPrice });
        if (isLess) {
            restaurantsQuery.andHaving("COUNT(menu.id) < :count", { count: dishes });
        } else {
            restaurantsQuery.andHaving("COUNT(menu.id) > :count", { count: dishes });
        }
        restaurantsQuery.orderBy("restaurantName", "ASC");
        return paginate<Restaurant>(restaurantsQuery, options);
    }

    createRestaurants(restaurants: RestaurantDto[]): SuccessResponse {
        try {
            restaurants.forEach((restaurant) => {
                const openingHours = this.createOpenHoursData(restaurant.openingHours);
                this.restaurantRepository.save(this.restaurantRepository.create({ openingHours, cashBalance: restaurant.cashBalance, menu: restaurant.menu, restaurantName: restaurant.restaurantName }));
            })
            return { success: true };
        } catch (error) {
            throw error;
        }

    }

    createOpenHoursData = (openHoursString: string): IOpenHours[] => {
        try {
            const hoursCategories = openHoursString.split('/');
            const openHours: IOpenHours[] = [];
            hoursCategories.forEach((timing) => {
                const extractedDayTimes = this.extractDayTime(timing);
                extractedDayTimes.forEach(item => {
                    const existingItem = openHours.find((existingItem) => existingItem.day === item.day)
                    if (existingItem) {
                        const existingStartTime = Date.parse(`01/01/2022 ${existingItem.startTime}`)
                        const existingEndTime = Date.parse(`01/01/2022 ${existingItem.endTime}`)
                        const startTime = Date.parse(`01/01/2022 ${item.startTime}`)
                        let endTime = Date.parse(`01/01/2022 ${item.endTime}`)

                        const endTimeDate = new Date(endTime);
                        const existingEndTimeDate = new Date(existingEndTime);
                        if (endTime < existingEndTime && existingEndTimeDate.getHours() > 12 && endTimeDate.getHours() < 12) {
                            endTime = endTimeDate.setDate(endTimeDate.getDate() + 1);
                        }

                        if (existingEndTime < startTime) {
                            existingItem.breakStart = existingItem.endTime;
                            existingItem.breakEnd = item.startTime;
                            existingItem.endTime = item.endTime;
                        } else if (existingStartTime > endTime) {
                            existingItem.breakEnd = existingItem.startTime;
                            existingItem.startTime = item.startTime;
                            existingItem.breakStart = item.endTime;
                        } else if (existingStartTime > startTime) {
                            existingItem.startTime = item.startTime;
                            existingItem.endTime = existingEndTime < endTime ? item.endTime : existingItem.endTime;
                        } else if (existingEndTime < endTime) {
                            existingItem.endTime = item.endTime;
                        }
                    } else {
                        openHours.push({ ...item });
                    }
                })
            })
            return openHours;
        } catch (error) {
            throw error;
        }
    }

    extractDayTime = (timing: string): IOpenHours[] => {
        try {
            const openHours: IOpenHours[] = [];
            const daysOfWeek = ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'];
            const openHour = { day: "", endTime: "", startTime: "" }
            const dayCheck = timing.split(',')[0].trim();
            const dayCheckDash = timing.split('-')[0].trim();
            let separator = '';
            let startDayIndex = -1;
            if (daysOfWeek.indexOf(dayCheck) !== -1) {
                separator = ',';
                startDayIndex = daysOfWeek.indexOf(dayCheck);
            } else if (daysOfWeek.indexOf(dayCheckDash) !== -1) {
                separator = '-';
                startDayIndex = daysOfWeek.indexOf(dayCheckDash);
            }
            if (startDayIndex !== -1) {
                const endDay = timing.split(separator)[1].trim().split(' ')[0].trim();
                const times = timing.split(endDay)[1].split('-');
                const openingTime = times[0].trim();
                const closingTime = times[1].trim();

                const startTime = this.formatTime(openingTime);
                const endTime = this.formatTime(closingTime);

                const endDayIndex = daysOfWeek.indexOf(endDay);
                for (let i = 0; i <= endDayIndex - startDayIndex; i++) {
                    openHour.day = daysOfWeek[i + startDayIndex];
                    openHour.startTime = startTime;
                    openHour.endTime = endTime;
                    openHours.push({ ...openHour });
                }
            } else {
                const day = timing.trim().split(' ')[0].trim();
                const times = timing.split(day)[1].split('-');
                const openingTime = times[0].trim();
                const closingTime = times[1].trim();

                openHour.day = day;
                openHour.startTime = this.formatTime(openingTime);
                openHour.endTime = this.formatTime(closingTime);
                openHours.push(openHour);
            }
            return openHours;
        } catch (error) {
            throw error;
        }
    }

    formatTime = (time: string): string => {
        try {
            let hours = Number(time.match(/^(\d+)/)[1]);
            const minutesMatch = time.match(/:(\d+)/);
            const minutes = Number(minutesMatch ? minutesMatch[1] : '00');
            const AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "pm" && hours < 12) hours = hours + 12;
            if (AMPM == "am" && hours == 12) hours = hours - 12;
            let sHours = hours.toString();
            let sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            return (sHours + ":" + sMinutes);
        } catch (error) {
            throw error;
        }
    }

    getRestaurantById(userId: string): Promise<Restaurant> {
        try {
            return this.restaurantRepository.findOne(userId)
        } catch (error) {
            throw error;
        }
    }
}
