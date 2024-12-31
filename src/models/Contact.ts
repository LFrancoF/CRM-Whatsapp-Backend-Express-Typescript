import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Unique,
    Default,
    HasMany
} from 'sequelize-typescript';
import ContactCustomField from './ContactCustomField';

@Table
class Contact extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @AllowNull(false)
    @Unique
    @Column
    number: string;

    @AllowNull(false)
    @Default('')
    @Column
    email: string;

    @Column
    profilePicUrl: string;

    @Default(false)
    @Column
    isGroup: boolean;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @HasMany(() => ContactCustomField)
    extraInfo: ContactCustomField[];
}

export default Contact;
