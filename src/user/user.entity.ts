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
    public cashBalance: string;

    @OneToMany((type) => Transaction, (transaction) => transaction.user)
    public purchaseHistory: Transaction[];
}
