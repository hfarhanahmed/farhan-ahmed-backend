import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ENTITY_NAMES } from '../constants';
import { Restaurant } from './restaurant.entity';

@Entity(ENTITY_NAMES.MENU)
export class Menu {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
    public restaurant: Restaurant;

    @Column('varchar', { length: 255 })
    public dishName: string;

    @Column('varchar', { length: 255 })
    public restaurantName: string;

    @Column('float')
    public transactionAmount: string;

    @Column('varchar', { length: 255 })
    public transactionDate: string;
}