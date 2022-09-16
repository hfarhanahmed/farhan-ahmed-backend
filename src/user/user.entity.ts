import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { ENTITY_NAMES } from '../constants';

import { Transaction } from './transaction.entity';

@Entity(ENTITY_NAMES.USER)
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar', { length: 255 })
    public name: string;

    @Column('float')
    public cashBalance: number;

    @OneToMany((type) => Transaction, (transaction) => transaction.user, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    public purchaseHistory: Transaction[];
}
