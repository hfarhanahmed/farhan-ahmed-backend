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

    @Column('float')
    public price: number;
}