import { Body, Controller, DefaultValuePipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { APIErrorResponse } from '../interface/APIErrorResponse.interface';
import { SuccessResponse } from '../interface/SuccessResponse.interface';
import { Errors } from '../utils/Errors';
import { OrderDto } from '../dto/order.dto';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post('create')
    async createOrder(@Body() order: OrderDto): Promise<SuccessResponse | APIErrorResponse> {
        try {
            return await this.orderService.createOrder(order);
        } catch (error) {
            return { code: Errors.errorCreating.code, message: Errors.errorCreating.message }
        }
    }

    @Post('list')
    async getOrders(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,): Promise<Pagination<Order> | APIErrorResponse> {
        try {
            return await this.orderService.getOrders({ page, limit });
        } catch (error) {
            return { code: Errors.errorCreating.code, message: Errors.errorCreating.message }
        }
    }
}
