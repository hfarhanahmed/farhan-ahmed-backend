import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ENTITY_NAMES } from '../constants';
import { Restaurant } from './restaurant.entity';

@Entity(ENTITY_NAMES.OPEN_Hours)
export class OpenHours {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
    public restaurant: Restaurant;

    @Column('varchar', { length: 255 })
    public day: string;

    @Column('time')
    public startTime: string;

    @Column('time')
    public endTime: string;

    @Column('time', { nullable: true })
    public breakStart: string;

    @Column('time', { nullable: true })
    public breakEnd: string;
}