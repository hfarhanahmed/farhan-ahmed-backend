import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { SuccessResponse } from 'src/interface/SuccessResponse.interface';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>) { }

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

    async addTransactions(transactions: Transaction[]): Promise<Transaction[]> {
        try {
            const promises: Promise<Transaction>[] = [];
            transactions.forEach((transaction) => {
                promises.push(this.transactionRepository.save(this.transactionRepository.create(transaction)));
            })
            return await Promise.all(promises);
        } catch (error) {
            throw error;
        }
    }

    getUserById(userId: string): Promise<User> {
        try {
            return this.userRepository.findOne(userId)
        } catch (error) {
            throw error;
        }
    }
}
