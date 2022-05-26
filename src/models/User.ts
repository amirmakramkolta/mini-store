import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import Product from './Product';

@Entity('store_user')
export default class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column({unique:true})
    email:string
    @Column()
    password:string
    @OneToMany(
        ()=>Product,
        (product)=>product.user
    )
    products:Product[]
}