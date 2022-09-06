import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ENTITY_NAMES } from '../constants';
import { User } from './user.entity';

@Entity(ENTITY_NAMES.TRANSACTION)
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => User, (user) => user.purchaseHistory)
    public user: User;

    @Column('varchar', { length: 255 })
    public dishName: string;

    @Column('varchar', { length: 255 })
    public restaurantName: string;

    @Column('float')
    public transactionAmount: string;

    @Column('varchar', { length: 255 })
    public transactionDate: string;
}