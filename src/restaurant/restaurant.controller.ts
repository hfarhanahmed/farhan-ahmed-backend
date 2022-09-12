import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SuccessResponse } from '../interface/SuccessResponse.interface';
import { APIErrorResponse } from '../interface/APIErrorResponse.interface';
import { IRestaurant } from '../interface/IRestaurant.interface';
import { Errors } from '../utils/Errors';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    @Get('restaurants')
    async sendSchedulers(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,): Promise<Pagination<Restaurant> | APIErrorResponse> {
        try {
            limit = limit > 100 ? 100 : limit;
            return await this.restaurantService.getRestaurants({ page, limit });
        } catch (error) {
            return { code: Errors.errorGetting.code, message: Errors.errorGetting.message }
        }
    }

    @Post('restaurants')
    async addRestaurants(@Body() restaurants: IRestaurant[]): Promise<SuccessResponse | APIErrorResponse> {
        try {
            return await this.restaurantService.createRestaurants(restaurants)
        } catch (error) {
            return { code: Errors.errorCreating.code, message: Errors.errorCreating.message }
        }
    }
}
