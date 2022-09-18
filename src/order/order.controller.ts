import { Body, Controller, Post } from '@nestjs/common';
import { APIErrorResponse } from '../interface/APIErrorResponse.interface';
import { SuccessResponse } from '../interface/SuccessResponse.interface';
import { Errors } from '../utils/Errors';
import { OrderDto } from '../dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post('create')
    async createOrder(@Body() order: OrderDto): Promise<SuccessResponse | APIErrorResponse> {
        try {
            return await this.orderService.createOrder(order)
        } catch (error) {
            return { code: Errors.errorCreating.code, message: Errors.errorCreating.message }
        }
    }
}
