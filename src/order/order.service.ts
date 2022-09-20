import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../dto/order.dto';
import { SuccessResponse } from '../interface/SuccessResponse.interface';
import { getManager, Repository } from 'typeorm';
import { Order } from './order.entity';
import { TransactionDTO } from '../dto/user.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { User } from '../user/user.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) { }

    async createOrder(order: OrderDto): Promise<SuccessResponse> {
        try {
            await getManager().transaction(async (manager) => {
                // Transaction: begin()

                const user = await manager.getRepository(User).findOne(order.userId);
                const restaurant = await manager.getRepository(Restaurant).findOne(order.restaurantId);

                const transactions: TransactionDTO[] = [];
                const transactionDate = new Date().toUTCString();
                let totalAmount = 0;
                order.orderedDishes.forEach((dish) => {
                    totalAmount += dish.price;
                    transactions.push({ transactionDate, user, dishName: dish.dishName, restaurantName: order.restaurantName, transactionAmount: dish.price });
                })
                user.cashBalance -= totalAmount;
                restaurant.cashBalance += totalAmount;

                await manager.getRepository(Order).save(this.orderRepository.create({ transactions, user, restaurant, totalAmount, userName: order.userName, restaurantName: restaurant.restaurantName, status: 'initial' }));
                // Transaction: commit()
            });
            return { success: true };
        } catch (error) {
            throw error;
        }

    }

    async getOrders(options: IPaginationOptions): Promise<Pagination<Order>> {
        return paginate<Order>(this.orderRepository, options);
    }
}
