import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

import { ENTITY_NAMES } from '../constants';

import { Transaction } from './transaction.entity';
import { Order } from '../order/order.entity';

@Entity(ENTITY_NAMES.USER)
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar', { length: 255, default: '' })
    public name: string;

    @Column('float')
    public cashBalance: number;

    @OneToMany((type) => Transaction, (transaction) => transaction.user, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    public purchaseHistory: Transaction[];

    @OneToMany((type) => Order, (order) => order.user, {
        cascade: false,
        onDelete: 'CASCADE',
        nullable: true,
    })
    public order?: Order[];
}
