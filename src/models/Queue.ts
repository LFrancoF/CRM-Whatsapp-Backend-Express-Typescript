import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Unique
} from 'sequelize-typescript';

@Table
class Queue extends Model<Queue> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @AllowNull(false)
    @Unique
    @Column
    color: string;

    @Column
    greetingMessage: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default Queue;
