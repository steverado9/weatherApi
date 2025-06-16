import { Table, Model, Column, DataType, HasOne } from "sequelize-typescript";
import Weather from "./weather.model";

@Table({
    tableName: "cities"
})
export default class City extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id!: number

    @Column({
        type: DataType.STRING(255),
        field: "name",
        allowNull: false
    })
    name!: string

    @HasOne(() => Weather)
    weather!: Weather;
}