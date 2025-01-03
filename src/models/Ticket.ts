import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    AutoIncrement,
    Default
} from 'sequelize-typescript';

import Contact from './Contact';
import Queue from './Queue';
import User from './User';
import Whatsapp from './Whatsapp';

@Table
class Ticket extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({ defaultValue: 'pending' })
    status: string;

    @Column
    unreadMessages: number;

    @Column
    lastMessage: string;

    @Default(false)
    @Column
    isGroup: boolean;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Contact)
    @Column
    contactId: number;

    @BelongsTo(() => Contact)
    contact: Contact;

    @ForeignKey(() => Whatsapp)
    @Column
    whatsappId: number;

    @BelongsTo(() => Whatsapp)
    whatsapp: Whatsapp;

    @ForeignKey(() => Queue)
    @Column
    queueId: number;

    @BelongsTo(() => Queue)
    queue: Queue;

    /*@HasMany(() => Message)
    messages: Message[];*/
}

export default Ticket;
