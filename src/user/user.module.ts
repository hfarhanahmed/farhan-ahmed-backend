import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Transaction } from './transaction.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

const ENTITIES: EntityClassOrSchema[] = [
  User,
  Transaction
];
@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
