import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ENTITY_NAMES } from '../constants';
import { User } from './user.entity';
import { Order } from '../order/order.entity';

@Entity(ENTITY_NAMES.TRANSACTION)
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => User, (user) => user.purchaseHistory)
    public user: User;

    @ManyToOne(() => Order, (order) => order.transactions, { cascade: false, nullable: true })
    public order?: Order;

    @Column('varchar', { length: 255 })
    public dishName: string;

    @Column('varchar', { length: 255 })
    public restaurantName: string;

    @Column('float')
    public transactionAmount: number;

    @Column('timestamp')
    public transactionDate: string;
}