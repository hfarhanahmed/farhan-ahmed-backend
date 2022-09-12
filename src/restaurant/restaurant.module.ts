import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Menu } from './menu.entity';
import { OpenHours } from './openHours.entity';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';

const ENTITIES: EntityClassOrSchema[] = [
  Restaurant,
  OpenHours,
  Menu
];

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  controllers: [RestaurantController],
  providers: [RestaurantService]
})
export class RestaurantModule { }
