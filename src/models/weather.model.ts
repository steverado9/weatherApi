import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import City from "./city.model";

@Table({
    tableName: "weather"
})

export default class Weather extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id!: number

    @Column({
        type: DataType.STRING(255),
        field: "main",
        allowNull: false
    })
    main!: string

    @Column({
        type: DataType.STRING(255),
        field: "description",
        allowNull: false
    })
    description!: string

    @ForeignKey(() => City)
    @Column({
        type: DataType.INTEGER,
        field: "cityId",
        allowNull: false,
    })
    cityId!: number;

    @BelongsTo(() => City)
    city!: City;

}