import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { UserModule } from '../user/user.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

const ENTITIES: EntityClassOrSchema[] = [
  Order
];
@Module({
  imports: [UserModule, RestaurantModule, TypeOrmModule.forFeature(ENTITIES)],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
