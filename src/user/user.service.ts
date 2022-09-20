import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { SuccessResponse } from 'src/interface/SuccessResponse.interface';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async addUsers(users: UserDto[]): Promise<SuccessResponse> {
        try {
            const promises: Promise<User>[] = [];
            users.forEach((user) => {
                promises.push(this.userRepository.save(user));
            })
            await Promise.all(promises);
            return { success: true };
        } catch (error) {
            throw error;
        }
    }
}
