import { Roles } from "./Roles";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { hash } from "bcryptjs";
import { DBTable } from "../constants/DBTable";
import { Genders } from "./../constants/Genders";
import { Customers } from "./Customers";
import { RefreshTokens } from "./RefreshTokens";
import { ShoppingCart } from "./Cart";

@Entity(DBTable.USERS)
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @ManyToOne(() => Roles, (roles) => roles.users, {
    eager: true,
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "role_id",
  })
  role: Roles;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 30,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "enum",
    enum: Genders,
    default: Genders.MALE,
  })
  gender: Genders;

  @Column({
    type: "text",
    nullable: true,
  })
  avatar_img: string;

  @Column({ nullable: true, type: "date" })
  day_of_birth: Date;

  @OneToOne(() => Customers, (customer) => customer.user)
  customer: Customers;

  @OneToOne(() => ShoppingCart, (cart) => cart.user)
  cart: ShoppingCart;

  @OneToMany(() => RefreshTokens, (tokens) => tokens.users)
  tokens: RefreshTokens[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
