import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { ENTITY_NAMES } from '../constants';

import { User } from '../user/user.entity';
import { Transaction } from '../user/transaction.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity(ENTITY_NAMES.ORDER)
export class Order {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar', { length: 255, default: '' })
    public userName: string;

    @Column('varchar', { length: 255, default: '' })
    public restaurantName: string;

    @Column('float')
    public totalAmount: number;

    @ManyToOne((type) => User, (user) => user.order, { cascade: true })
    public user: User;

    @ManyToOne((type) => Restaurant, (restaurant) => restaurant.order, { cascade: true })
    public restaurant: Restaurant;

    @OneToMany((type) => Transaction, (transaction) => transaction.order, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    public transactions: Transaction[];
}
