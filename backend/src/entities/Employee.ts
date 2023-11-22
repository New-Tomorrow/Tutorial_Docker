import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class Employee {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    nome: string

    @Column()
    sobrenome: string

    @Column()
    data: string

    @Column()
    cargos: string


}