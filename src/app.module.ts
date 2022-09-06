import { Module, Res } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { TableMetadataArgs } from 'typeorm/metadata-args/TableMetadataArgs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfiguration } from './environments/environment';
import { Restaurant } from './restaurant/restaurant.entity';
import { Menu } from './restaurant/menu.entity';
import { User } from './user/user.entity';
import { Transaction } from './user/transaction.entity';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';



const ENTITIES = [Restaurant, Menu, User, Transaction];

const MODULES = [
  TypeOrmModule.forRoot({
    ...(typeOrmConfiguration as TypeOrmModuleOptions),
    entities: getMetadataArgsStorage().tables.map(
      ({ target }: TableMetadataArgs) => target,
    ),
  }),
  RestaurantModule,
  UserModule,
  TypeOrmModule.forFeature(ENTITIES)
];
@Module({
  imports: MODULES,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
