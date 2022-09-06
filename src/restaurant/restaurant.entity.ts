import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ENTITY_NAMES } from '../constants';

import { Menu } from './menu.entity';

@Entity(ENTITY_NAMES.RESTAURANT)
export class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar', { length: 255 })
    public restaurantName: string;

    @Column('varchar', { length: 255 })
    public openingHours: string;

    @Column('float')
    public cashBalance: string;

    @OneToMany((type) => Menu, (menu) => menu.restaurant)
    public menu: Menu[];
}