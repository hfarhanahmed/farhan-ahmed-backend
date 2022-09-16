import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

import { ENTITY_NAMES } from '../constants';

import { Menu } from './menu.entity';
import { OpenHours } from './openHours.entity';

@Entity(ENTITY_NAMES.RESTAURANT)
export class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar', { length: 255 })
    public restaurantName: string;

    @OneToMany((type) => OpenHours, (hours) => hours.restaurant, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    public openingHours: OpenHours[];

    @Column('float')
    public cashBalance: number;

    @OneToMany((type) => Menu, (menu) => menu.restaurant, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    public menu: Menu[];
}