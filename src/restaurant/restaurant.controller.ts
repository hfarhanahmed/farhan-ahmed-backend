import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SuccessResponse } from '../interface/SuccessResponse.interface';
import { APIErrorResponse } from '../interface/APIErrorResponse.interface';
import { Errors } from '../utils/Errors';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { RestaurantDto } from '../dto/restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    @Get('list')
    async listRestaurants(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,): Promise<Pagination<Restaurant> | APIErrorResponse> {
        try {
            limit = limit > 100 ? 100 : limit;
            return await this.restaurantService.getRestaurants({ page, limit });
        } catch (error) {
            return { code: Errors.errorGetting.code, message: Errors.errorGetting.message }
        }
    }

    @Get('search')
    async searchRestaurants(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
        @Query('searchBy', new DefaultValuePipe('restaurant')) searchBy: string = 'restaurant',
        @Query('search', new DefaultValuePipe('')) search: string = '',): Promise<Pagination<Restaurant> | APIErrorResponse> {
        try {
            limit = limit > 100 ? 100 : limit;
            return await this.restaurantService.searchRestaurants({ page, limit }, searchBy === 'restaurant', search);
        } catch (error) {
            return { code: Errors.errorGetting.code, message: Errors.errorGetting.message }
        }
    }

    @Get('filter')
    async filterRestaurants(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
        @Query('dishes', new DefaultValuePipe(50), ParseIntPipe) dishes: number = 50,
        @Query('lessThan', new DefaultValuePipe(10)) lessThan: string = 'lessThan',
        @Query('maxPrice', new DefaultValuePipe(10), ParseIntPipe) maxPrice: number = 100,
        @Query('minPrice', new DefaultValuePipe(10), ParseIntPipe) minPrice: number = 0,): Promise<Pagination<Restaurant> | APIErrorResponse> {
        try {
            limit = limit > 100 ? 100 : limit;
            return await this.restaurantService.filterRestaurants({ page, limit }, dishes, lessThan === 'lessThan', minPrice, maxPrice);
        } catch (error) {
            return { code: Errors.errorGetting.code, message: Errors.errorGetting.message }
        }
    }

    @Post('add')
    addRestaurants(@Body() restaurants: RestaurantDto[]): SuccessResponse | APIErrorResponse {
        try {
            return this.restaurantService.createRestaurants(restaurants)
        } catch (error) {
            return { code: Errors.errorCreating.code, message: Errors.errorCreating.message }
        }
    }
}
