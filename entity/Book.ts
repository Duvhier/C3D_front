import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity("books")
export class Book {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    publishedDate: Date

    @Column()
    genre: string

    @Column({ nullable: true })
    coverUrl?: string

}
