import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "~/constants/DBTable";
import { Users } from "./Users";
import { CartItems } from "./CartItems";

@Entity(DBTable.CART)
export class ShoppingCart extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @OneToOne(() => Users, (user) => user.cart)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @OneToMany(() => CartItems, (citems) => citems.cart)
  citems: CartItems[];

  @Column({
    type: "text",
    nullable: false,
  })
  refresh_token: string;

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
