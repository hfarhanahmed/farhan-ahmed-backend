import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { SuccessResponse } from 'src/interface/SuccessResponse.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    addUsers(users: UserDto[]): SuccessResponse {
        try {
            users.forEach((user) => {
                this.userRepository.save(this.userRepository.create(user));
            })
            return { success: true };
        } catch (error) {
            throw error;
        }
    }
}
