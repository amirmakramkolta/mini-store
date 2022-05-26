import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import User from './User'

@Entity("product")
export default class Product extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string
    @Column()
    name:string
    @Column({
        nullable:true
    })
    image_url:string
    @Column({
        type:"numeric"
    })
    price:number
    @ManyToOne(
        ()=> User,
        (user)=>user.products,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({name:"user_id"})
    user:User
}